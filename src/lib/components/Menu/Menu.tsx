import "./Menu.scss";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import { IMenuProps, IMenuRef, IOptionProps } from "./Menu.types";
import Icon, { IconCheck } from "../Icon/Icon";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";
import { throttle } from "lodash";
import TextInput, { TextInputRef } from "../TextInput/TextInput";

const renderStringWithSearch = (
  value: string,
  searchValue?: string | RegExp | ((str: string) => boolean)
) => {
  if (!searchValue) {
    return value;
  }

  if (searchValue instanceof Function) {
    return searchValue(value) ? (
      <span className="SearchValue">{value}</span>
    ) : (
      value
    );
  }

  if (searchValue instanceof RegExp) {
    return (
      <span
        dangerouslySetInnerHTML={{
          __html: value.replace(
            searchValue,
            (match) => `<span class="SearchValue">${match}</span>`
          ),
        }}
      ></span>
    );
  }

  const index = value.toLowerCase().indexOf(searchValue?.toLowerCase());

  if (index === -1) {
    return value;
  }

  return (
    <>
      {value.slice(0, index)}
      <span className="SearchValue">
        {value.slice(index, index + searchValue.length)}
      </span>
      {value.slice(index + searchValue.length)}
    </>
  );
};

function Option(props: IOptionProps) {
  const { multiSelect, data = [], value, readOnly, children } = props;

  if (multiSelect) {
    const checked = data.some((r) => r === value);

    return (
      <div
        className={classNames(
          "MenuOption",
          {
            ReadOnly: readOnly,
            Disabled: props.disabled,
            IsButton: props.type === "button",
            Selected: props.isSelected || checked,
          },
          props.className
        )}
        tabIndex={0}
        onClick={(ev) => {
          ev.preventDefault();
          ev.stopPropagation();

          props.onClick?.(value);

          if (props.type === "button") {
          }
          (document.activeElement as HTMLElement)?.blur();
        }}
      >
        {props.type !== "button" && (
          <div
            className={classNames("Checkbox", {
              disabled: readOnly,
              checked,
            })}
          >
            {checked ? <Icon size={16} icon={<IconCheck />} /> : null}
            <input type="checkbox" />
          </div>
        )}
        {typeof children === "string" && props.searchValue
          ? renderStringWithSearch(children, props.searchValue)
          : children}
      </div>
    );
  }

  // if (props.href) {
  //   return (
  //     <Link
  //       tabIndex={0}
  //       to={props.href}
  //       className={classNames(
  //         "MenuOption",
  //         {
  //           ReadOnly: readOnly,
  //           Disabled: props.disabled,
  //           Selected: props.isSelected,
  //         },
  //         props.className
  //       )}
  //       onClick={(ev) => {
  //         ev.stopPropagation();

  //         ev.currentTarget.blur();
  //         props.onClick?.(value);
  //       }}
  //     >
  //       {typeof children === "string" && props.searchValue
  //         ? renderStringWithSearch(children, props.searchValue)
  //         : children}
  //     </Link>
  //   );
  // }
  if (props.render) {
    return <div>{props.render(props)}</div>;
  }

  return (
    <li
      tabIndex={0}
      className={classNames(
        "MenuOption",
        {
          ReadOnly: readOnly,
          Disabled: props.disabled,
          Selected: props.isSelected,
        },
        props.className
      )}
      onClick={(ev) => {
        ev.preventDefault();
        ev.stopPropagation();

        ev.currentTarget.blur();
        props.onClick?.(value);
      }}
    >
      {typeof children === "string" && props.searchValue
        ? renderStringWithSearch(children, props.searchValue)
        : children}
    </li>
  );
}

const Menu = forwardRef<IMenuRef, IMenuProps>((props, ref) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLUListElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [optionsStyle, setOptionsStyle] = useState<React.CSSProperties>();
  const [options, _setOptions] = useState<React.ReactElement<IOptionProps>[]>(
    []
  );

  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  const searchRef = useRef<TextInputRef>(null);

  useEffect(() => {
    if (props.onSearch) {
      props.onSearch(searchValue);
    }
  }, [searchValue]);

  useEffect(() => {
    props.onActiveChange?.(isVisible);
  }, [isVisible]);

  useImperativeHandle(ref, () => ({
    focus: () => {
      targetRef?.current?.focus();
    },
    focusSearch: () => {
      searchRef?.current?.focus?.();
    },
  }));

  useEffect(() => {
    function onMouseWheel(ev: Event) {
      if (targetRef.current?.children[0] === document.activeElement) {
        if (ev.composedPath().some((el) => el === optionsRef.current)) {
          return;
        }

        setTimeout(() => {
          (targetRef.current?.children[0] as HTMLElement)?.blur();
        }, 100);

        setIsVisible(false);
      }
    }

    window.addEventListener("mousewheel", onMouseWheel);

    return () => {
      window.removeEventListener("mousewheel", onMouseWheel);
    };
  }, [targetRef, optionsRef]);

  const setOptions = (
    children: IMenuProps["children"],
    force = false,
    search?: string
  ) => {
    if (children) {
      let result: React.ReactElement<IOptionProps>[] = Array.isArray(children)
        ? children
        : [children];

      if (result) {
        if (props.multiSelect && options.length && !force) {
          result = options.map((option) =>
            result.find((child) => child.props.value === option.props.value)
          ) as React.ReactElement<IOptionProps>[];
        }

        _setOptions(
          React.Children.map(
            result ?? [],
            (child: React.ReactElement<IOptionProps>, index) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                  key: index,
                  ...(props?.multiSelect && {
                    multiSelect: props.multiSelect,
                  }),
                  data: props.data,
                  searchValue: search,
                  isSelected:
                    props.value === child.props.value ||
                    props.data?.includes(child.props.value as string),
                  onClick: (value: unknown) => {
                    if (!child.props.readOnly) {
                      props.onSelect?.(value, child.props);

                      // if (search) {
                      //   searchRef?.current?.focus?.();
                      // }

                      if (props.trigger === "hover") {
                        setIsVisible(false);
                      }
                    }
                  },
                });
              }

              return child;
            }
          ).sort((a, b) => {
            if (props.ignoreSelectedSort) {
              return 0;
            }

            const isASelected = a.props.isSelected;
            const isBSelected = b.props.isSelected;

            if (isASelected && !isBSelected) {
              return -1;
            } else if (!isASelected && isBSelected) {
              return 1;
            }

            return 0;
          })
        );
      }
    } else {
      _setOptions([]);
    }
  };

  useEffect(() => {
    setOptions(props.children);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.children]);

  const [lastFetchedChildren, setLastFetchedChildren] = useState<
    IMenuProps["children"]
  >([]);

  const fetchOptions = useMemo(() => {
    if (props.fetchOptions) {
      return throttle((value: string) => {
        setLoading(true);

        return props.fetchOptions!(value).then((result) => {
          setOptions(result, false, value);
          setLastFetchedChildren(result);
          setLoading(false);
        });
      }, 1000);
    }
  }, []);

  useEffect(() => {
    setOptions(props.children ?? lastFetchedChildren, false, searchValue);
  }, [props.data, props.value]);

  useEffect(() => {
    if (fetchOptions) {
      fetchOptions(searchValue);
    } else {
      setOptions(props.children, false, searchValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, props.search, props.autoComplete, fetchOptions]);

  const sortSelectedChildren = (children: IMenuProps["children"]) => {
    if (children) {
      children = Array.isArray(children) ? children : [children];

      return [...(children as React.ReactElement[])].sort((a, b) => {
        if (a.props?.type === "button" || b.props?.type === "button") {
          return 0;
        }

        if (
          props.data?.includes(a.props?.value as string) &&
          !props.data?.includes(b.props?.value as string)
        ) {
          return -1;
        } else if (
          !props.data?.includes(a.props?.value as string) &&
          props.data?.includes(b.props?.value as string)
        ) {
          return 1;
        }

        return 0;
      });
    }

    return [];
  };

  const handleOptionsStyle = () => {
    const { current: targetEl } = targetRef;
    const { current: optionsEl } = optionsRef;

    if (targetEl && optionsEl) {
      const optionsRect = optionsEl.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();

      if (props.position === "left") {
        let top = targetRect.top;

        if (top + optionsRect.height > window.innerHeight) {
          top = window.innerHeight - optionsRect.height;
        }

        setOptionsStyle({
          right: window.innerWidth - targetRect.right + optionsRect.width + 2,
          top,
          minWidth: props.minWidth ?? targetRect.width,
        });
      } else {
        let top = targetRect.bottom + 2;

        if (top + optionsRect.height > window.innerHeight) {
          top = targetRect.top - optionsRect.height;
        }

        if (props.placement === "right") {
          setOptionsStyle({
            right: window.innerWidth - targetRect.right,
            top,
            minWidth: props.minWidth ?? targetRect.width,
          });
        } else {
          setOptionsStyle({
            left: targetRect.left,
            top,
            minWidth: props.minWidth ?? targetRect.width,
          });
        }
      }
    }
  };

  useEffect(() => {
    const { current: optionsEl } = optionsRef;

    function handleTransitionStart(ev: TransitionEvent) {
      if (ev.target === optionsEl) {
        const { opacity } = window.getComputedStyle(
          ev.target as HTMLUListElement
        );

        if (Number(opacity) > 0 && Number(opacity) < 1) {
          setOptions(
            sortSelectedChildren(props.children ?? lastFetchedChildren),
            true,
            searchValue
          );
        }
      }
    }

    if (props.multiSelect) {
      if (optionsEl) {
        optionsEl.addEventListener("transitionstart", handleTransitionStart);

        return () =>
          optionsEl.removeEventListener(
            "transitionstart",
            handleTransitionStart
          );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    optionsRef,
    props.data,
    props.children,
    lastFetchedChildren,
    searchValue,
  ]);

  useEffect(() => {
    handleOptionsStyle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetRef]);

  const renderMultiSelect = (): React.ReactElement => {
    return (
      <>
        <div className="MenuSearch">
          <TextInput
            ref={searchRef}
            clearBtn
            placeholder={props.placeholder ?? "Search"}
            onEnterPress={() => {
              if (props.autoComplete) {
                props.onSelect?.(searchValue, null);
                (document.activeElement as HTMLElement)?.blur();
              }
            }}
            value={searchValue}
            onChange={setSearchValue}
          />
        </div>
        <div className="MenuOptionWrapper">
          {!!optionsToRender.length && !loading && optionsToRender}
          {!optionsToRender.length && (
            <div className="MenuOptionWrapperEmpty">
              <img
                alt=""
                height={55}
                src={
                  props.theme === "dark"
                    ? "/assets/images/EmptyTable_dark.svg"
                    : "/assets/images/EmptyTable.svg"
                }
              />
              No available option
            </div>
          )}
          {!optionsToRender.length && loading && (
            <Loader visible={!optionsToRender.length && loading} />
          )}
        </div>
        {!!optionsToRender.length && (
          <div className="MenuFooter">
            <Button
              label="Apply"
              type="ghost"
              onClick={() => {
                (document.activeElement as HTMLElement)?.blur();
              }}
            />
            <Button
              label="Clear All"
              onClick={() => {
                props.onClear?.();
              }}
              disabled={!props.data?.length}
              type="link"
            />
          </div>
        )}
      </>
    );
  };

  // useEffect(() => {
  //   if (isVisible) {
  //     searchRef?.current?.focus();
  //   }
  // }, [isVisible]);

  const optionsToRender =
    searchValue && !props.fetchOptions
      ? options.filter((opt) => {
          if (typeof opt?.props?.children === "string") {
            if (
              searchValue &&
              opt?.props?.children
                ?.toLowerCase()
                .includes(`${searchValue}`.toLowerCase())
            ) {
              return opt;
            }
          } else if (typeof opt?.props?.value === "string") {
            if (
              searchValue &&
              opt?.props?.value
                ?.toLowerCase()
                .includes(`${searchValue}`.toLowerCase())
            ) {
              return opt;
            }
          }
          return false;
        })
      : options;

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const target = useMemo(() => {
    if (typeof props.target === "function") {
      return props.target(isVisible);
    }

    return props.target;
  }, [props.target, isVisible]);

  return (
    <div
      className={classNames(
        "Menu",
        {
          [props.placement ?? "left"]: true,
          [props.trigger ?? "focus"]: true,
          visible: isVisible,
          autoComplete: props.autoComplete,
          ShouldNotRenderSearchResult: optionsToRender.length <= 1,
        },
        props.className
      )}
      onMouseEnter={() => {
        if (props.trigger === "hover") {
          clearTimeout(timeoutRef.current);

          handleOptionsStyle();
          setIsVisible(true);
        }
      }}
      onMouseLeave={() => {
        if (props.trigger === "hover") {
          timeoutRef.current = setTimeout(() => {
            setIsVisible(false);
          }, 500);
        }
      }}
      onFocus={() => {
        if (props.trigger === "hover") {
          return;
        }
        handleOptionsStyle();
        setIsVisible(true);
      }}
    >
      <div
        ref={targetRef}
        onClick={(ev) => {
          if (props.trigger === "hover") {
            return;
          }

          ev.stopPropagation();
          ev.preventDefault();
        }}
        onMouseDown={(ev) => {
          if (props.trigger === "hover") {
            return;
          }

          ev.stopPropagation();

          if (targetRef.current?.children[0] === document.activeElement) {
            setTimeout(() => {
              (targetRef.current?.children[0] as HTMLElement)?.blur();
            }, 100);

            setIsVisible(false);
          } else {
            handleOptionsStyle();
            setIsVisible(true);
          }
        }}
      >
        {target}
      </div>
      <ul
        className={classNames("Options", { disabled: props.disabled })}
        style={optionsStyle ? optionsStyle : { opacity: 0 }}
        ref={optionsRef}
        onTransitionEnd={(ev) => {
          const { opacity } = window.getComputedStyle(ev.currentTarget);

          if (!+opacity) {
            setIsVisible(false);
            props.onBlur?.(undefined);
          }
        }}
      >
        {props?.multiSelect ? (
          renderMultiSelect()
        ) : (
          <>
            {props.search && (
              <div className="MenuSearch">
                <TextInput
                  ref={searchRef}
                  clearBtn
                  placeholder={props.placeholder ?? "Search"}
                  onEnterPress={() => {
                    if (props.autoComplete) {
                      props.onSelect?.(searchValue, null);
                      (document.activeElement as HTMLElement)?.blur();
                    }
                  }}
                  value={searchValue}
                  onChange={setSearchValue}
                />
              </div>
            )}
            <div className="MenuOptionWrapper">
              {!!optionsToRender.length && optionsToRender}
              {!optionsToRender.length && !props.autoComplete && (
                <div className="MenuOptionWrapperEmpty">
                  <img
                    alt=""
                    height={55}
                    src={
                      props.theme === "dark"
                        ? "/assets/images/EmptyTable_dark.svg"
                        : "/assets/images/EmptyTable.svg"
                    }
                  />
                  No available option
                </div>
              )}
              {!optionsToRender.length && loading && (
                <Loader visible={!optionsToRender.length && loading} />
              )}
            </div>
            {props.footer && <div className="MenuFooter">{props.footer}</div>}
            {props.autoComplete && (
              <div className="MenuFooter">
                <Button
                  label="Apply"
                  type="ghost"
                  disabled={!searchValue}
                  onClick={() => {
                    props.onSelect?.(searchValue, null);
                    (document.activeElement as HTMLElement)?.blur();
                  }}
                />
              </div>
            )}
          </>
        )}
      </ul>
    </div>
  );
});

export { Option };
export default Menu;

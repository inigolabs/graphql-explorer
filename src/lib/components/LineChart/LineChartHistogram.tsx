import styles from './LineChart.module.css';

import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import * as Recharts from 'recharts';
import classNames from 'classnames';
import { useWindowSize } from '@utils/helpers';

import {
  LineChartDotProps,
  LineChartLegendProps,
  LineChartLine,
  LineChartProps,
  LineChartTooltipProps,
} from './LineChart.types';

const LineChartTooltip = (props: LineChartTooltipProps) => {
  if (!props.point) {
    return null;
  }

  const time = moment(props.point.time);
  const timeEnd = moment(props.point.time).add(props.interval, 'minutes');

  return (
    <div className={styles.Tooltip}>
      {(props.dateVisible ?? true) && (
        <span className={styles.Title}>
          {`${time.format('dddd')}, ${time.format('MMM DD hh:mm')} - ${timeEnd.format('hh:mm')}`}
        </span>
      )}
      <table className={styles.Table}>
        <thead>
          <tr>
            <th>Value</th>
            <th>#</th>
            <th>Avg</th>
          </tr>
        </thead>
        <tbody>
          {props.lines.map((line) => {
            const value: number = props.point![line.dataKey as keyof LineChartProps['data']['points'][0]];

            return (
              <tr key={line.dataKey}>
                <td>
                  <div className={styles.Circle} style={{ backgroundColor: line.color }}></div>
                  {line.label}
                </td>
                <td>{value}</td>
                <td>{`${(value / props.interval).toFixed(2)} / min`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const LineChartDot = (props: LineChartDotProps) => {
  return (
    <>
      <circle cx={props.cx} cy={props.cy} r="8" fill="#FFFFFF" style={{ filter: 'url(#shadow)' }} />
      <circle cx={props.cx} cy={props.cy} r="6" fill={props.color} />
    </>
  );
};

export const LineChartLegend = (props: LineChartLegendProps) => {
  const [selected, setSelected] = useState<LineChartLine[]>([]);

  useEffect(() => {
    if (props.onSelect) {
      props.onSelect(selected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  useEffect(() => {
    setSelected(props.lines);
  }, [props.lines]);

  const isLineSelected = (line: LineChartLine) => {
    return selected.includes(line);
  };

  const toggleLine = (line: LineChartLine) => {
    if (!isLineSelected(line)) {
      setSelected([...selected, line]);
    } else {
      setSelected(selected.filter((selectedLine) => selectedLine !== line));
    }
  };

  return (
    <div className={styles.Legend}>
      {props.lines.map((line) => (
        <div
          key={line.dataKey}
          className={classNames(styles.Item, {
            [styles.Selected]: isLineSelected(line),
          })}
          onClick={() => toggleLine(line)}
        >
          <div className={styles.Circle} style={{ borderColor: line.color }}></div>
          <div className={styles.Label}>{line.label}</div>
        </div>
      ))}
      {/*<Tooltip*/}
      {/*  popupStyle={{padding: 0}}*/}
      {/*  renderContent={() => (*/}
      {/*    <LineChartTooltip*/}
      {/*      lines={[*/}
      {/*        {*/}
      {/*          dataKey: "total",*/}
      {/*          label: "Total",*/}
      {/*          color: "#055FFC",*/}
      {/*        },*/}
      {/*        ...props.lines,*/}
      {/*      ]}*/}
      {/*      interval={props.data.segmentInterval}*/}
      {/*      point={props.data.points.reduce(*/}
      {/*        (acc, point) => {*/}
      {/*          props.lines.forEach((line) => {*/}
      {/*            acc[line.dataKey] = acc[line.dataKey] ?? 0;*/}

      {/*            acc[line.dataKey] += point[line.dataKey];*/}
      {/*            acc.total += point[line.dataKey];*/}
      {/*          });*/}

      {/*          return acc;*/}
      {/*        },*/}
      {/*        {total: 0}*/}
      {/*      )}*/}
      {/*      dateVisible={false}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*>*/}
      {/*  <Icon size={16} icon={<IconInfoFill/>}/>*/}
      {/*</Tooltip>*/}
    </div>
  );
};

const LineChart = (props: LineChartProps) => {
  const windowSize = useWindowSize();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerSize({ width, height });
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [visible, setVisible] = useState<LineChartLine[]>([]);
  const [dateFormat, setDateFormat] = useState<string>('MMM DD HH:mm');

  useEffect(() => {
    if (props.data !== undefined) {
      const mTimeStart = moment(props.data.timeStart);
      const mTimeEnd = moment(props.data.timeEnd);

      const mDiffInDays = Math.abs(mTimeStart.diff(mTimeEnd, 'days'));

      if (mDiffInDays <= 1) {
        setDateFormat('HH:mm');
      } else if (mDiffInDays <= 7) {
        setDateFormat('MMM DD HH:mm');
      } else {
        setDateFormat('MMM DD');
      }
    }
  }, [props.data]);

  const isLineVisible = (line: LineChartLine) => {
    if (props.legend) {
      return visible.includes(line);
    }
    return true;
  };

  useEffect(() => {
    setTimeout(() => {
      if (containerRef.current) {
        const tooltipWrapper = containerRef.current.querySelector('.recharts-tooltip-wrapper');

        if (tooltipWrapper) {
          tooltipWrapper.removeAttribute('tabindex');
        }
      }
    }, 200);
  }, [containerRef]);

  return (
    <div className={styles.Container} ref={containerRef}>
      <div className={props.enableBorder ? styles.Border : ''}>
        {!!(props.title || props.legend) && (
          <div className={styles.Header}>
            {props.title}
            {!!props.legend && (
              <div className={styles.Legend}>
                <LineChartLegend onSelect={(selected) => setVisible(selected)} lines={props.lines} data={props.data} />
              </div>
            )}
          </div>
        )}
        <div
          className={classNames(styles.Chart, {
            [styles.DisableYAxis]: props.disableYAxis,
          })}
        >
          <Recharts.ResponsiveContainer width="100%">
            <Recharts.LineChart data={props.data.points} margin={{ top: 20, left: 5, right: 5, bottom: 5 }}>
              <filter id="shadow" colorInterpolationFilters="sRGB">
                <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.1" />
              </filter>
              {!props.enableBorder && (
                <Recharts.XAxis
                  hide={props.disableXAxis}
                  style={{ opacity: 0, display: 'none' }}
                  axisLine={false}
                  tickLine={false}
                />
              )}
              <Recharts.YAxis
                hide={props.disableYAxis}
                fontSize={12}
                fontWeight={400}
                tickCount={3}
                fontFamily={`'Roboto', sans-serif`}
                stroke="#575757"
                axisLine={false}
                tickLine={false}
              />
              {!props.disableYAxis && !props.disableXAxis && (
                <Recharts.CartesianGrid vertical={false} stroke="#EDF3FB" />
              )}
              {!props.disableTooltip && (
                <Recharts.Tooltip
                  content={(tooltipProps) => {
                    return (
                      <LineChartTooltip
                        lines={props.lines}
                        interval={props.data.segmentInterval}
                        point={props.data.points[tooltipProps.label]}
                      />
                    );
                  }}
                  position={{ y: 20 }}
                  cursor={{
                    fill: 'none',
                    stroke: 'var(--color-divider-primary)',
                    strokeDasharray: '4',
                    strokeDashoffset: '4',
                  }}
                />
              )}
              {[...props.lines].reverse().map((line) => (
                <Recharts.Line
                  key={line.dataKey}
                  type="monotone"
                  dataKey={line.dataKey}
                  stroke={line.color}
                  strokeWidth={line.strokeWidth ?? 2}
                  opacity={isLineVisible(line) ? 1 : 0}
                  dot={false}
                  animationBegin={0}
                  animationEasing={'ease-out'}
                  animationDuration={800}
                  activeDot={(dotProps: any) => <LineChartDot color={line.color} {...dotProps} />}
                />
              ))}
            </Recharts.LineChart>
          </Recharts.ResponsiveContainer>
        </div>
      </div>
      {!props.disableXAxis && (
        <div className={styles.XAxis} style={props.enableBorder ? { marginTop: 0 } : {}}>
          {Array.from(new Set(props.data.points.map((item) => item.time)))
            .filter((_, i, arr) => {
              let value = 9;

              if (windowSize.width < 1440) {
                value = 12;
              }
              if (windowSize.width < 1280) {
                value = 15;
              }
              if (windowSize.width < 1024) {
                value = 18;
              }

              return i === 0 || arr.length - 1 === i || i % value === 0;
            })
            .map((value) => (
              <span key={value}>{moment(value).format(dateFormat)}</span>
            ))}
        </div>
      )}
    </div>
  );
};

export default LineChart;
export * from './LineChart.types';

import "./index.css";

import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import Dashboard, {
  DashboardCountChart,
  DashboardListChart,
} from "./lib/components/Dashboard/Dashboard";
import { shortNumber } from "./lib/utils/shortNumber";

function App() {
  return (
    <div
      style={{
        padding: "var(--gutter-regular)",
      }}
    >
      <Dashboard
        widgets={[
          {
            tabs: [
              {
                title: "Characters Count",
                charts: [
                  DashboardCountChart({
                    query: {
                      document: /* gql */ `
                        query CharactersCount {
                          characters {
                            info {
                              count
                            }
                          }
                        }
                      `,
                    },
                    options: {
                      dataPath: "characters.info.count",
                      renderValue: (value) => {
                        if (value === "--") {
                          return value;
                        }

                        return shortNumber(value);
                      },
                    },
                  }),
                ],
              },
            ],
            span: 4,
          },
          {
            tabs: [
              {
                title: "Episodes Count",
                charts: [
                  DashboardCountChart({
                    query: {
                      document: /* gql */ `
                        query EpisodesCount {
                          episodes {
                            info {
                              count
                            }
                          }
                        }
                      `,
                    },
                    options: {
                      dataPath: "episodes.info.count",
                      renderValue: (value) => {
                        if (value === "--") {
                          return value;
                        }

                        return shortNumber(value);
                      },
                    },
                  }),
                ],
              },
            ],
            span: 4,
          },
          {
            tabs: [
              {
                title: "Locations Count",
                charts: [
                  DashboardCountChart({
                    query: {
                      document: /* gql */ `
                        query LocationsCount {
                          locations {
                            info {
                              count
                            }
                          }
                        }
                      `,
                    },
                    options: {
                      dataPath: "locations.info.count",
                      renderValue: (value) => {
                        if (value === "--") {
                          return value;
                        }

                        return shortNumber(value);
                      },
                    },
                  }),
                ],
              },
            ],
            span: 4,
          },
          {
            tabs: [
              {
                title: "Characters List",
                charts: [
                  DashboardListChart({
                    query: {
                      document: /* gql */ `
                        query Characters {
                          characters {
                            results {
                              name
                              origin {
                                name
                              }
                            }
                          }
                        }
                      `,
                      select: (data) => data.characters.results,
                    },
                    options: {
                      defaultSortColumn: "name",
                      columns: [
                        {
                          label: "Name",
                          dataKey: "name",
                        },
                        {
                          label: "Origin",
                          dataKey: "origin",
                          render: (value) => {
                            if (!value) {
                              return "--";
                            }

                            return value.name;
                          },
                        },
                      ],
                    },
                  }),
                ],
              },
            ],
            span: 4,
          },
          {
            tabs: [
              {
                title: "Episodes List",
                charts: [
                  DashboardListChart({
                    query: {
                      document: /* gql */ `
                        query Episodes {
                          episodes {
                            results {
                              name
                              air_date
                            }
                          }
                        }
                      `,
                      select: (data) => data.episodes.results,
                    },
                    options: {
                      defaultSortColumn: "name",
                      columns: [
                        {
                          label: "Name",
                          dataKey: "name",
                        },
                        {
                          label: "Air Date",
                          dataKey: "air_date",
                        },
                      ],
                    },
                  }),
                ],
              },
            ],
            span: 4,
          },
          {
            tabs: [
              {
                title: "Locations List",
                charts: [
                  DashboardListChart({
                    query: {
                      document: /* gql */ `
                        query Locations {
                          locations {
                            results {
                              name
                              type
                              dimension
                            }
                          }
                        }
                      `,
                      select: (data) => data.locations.results,
                    },
                    options: {
                      defaultSortColumn: "name",
                      columns: [
                        {
                          label: "Name",
                          dataKey: "name",
                        },
                        {
                          label: "Type",
                          dataKey: "type",
                        },
                        {
                          label: "Dimension",
                          dataKey: "dimension",
                        },
                      ],
                    },
                  }),
                ],
              },
            ],
            span: 4,
          },
          ,
        ]}
      />
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

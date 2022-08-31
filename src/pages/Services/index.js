import React from "react";
import { Skeleton } from "components/Skeleton";
import { useMainStore } from "stores";

const Services = () => {
  const { stats } = useMainStore();

  return (
    <div className="bg-dark p-2 rounded rounded-l-none w-full max-w-xl h-[600px] max-h-5/6 overflow-y-scroll border-banano-yellow border-l-4">
      <table className="text-gray-300 table-auto w-full">
        <thead>
          <tr className="[&>*]:font-medium table-fixed [&>*]:py-2 border-b-2 border-banano-yellow/25 [&>*]:px-1 [&>*]:sm:px-3 text-left">
            <th>Name</th>
            <th className="text-right whitespace-nowrap">Total Requests</th>
          </tr>
        </thead>
        <tbody>
          {stats?.services ? (
            <React.Fragment>
              {stats?.services.map((service) => {
                return (
                  <tr className="[&>*]:first:pt-4 [&>*]:py-1 border-b-1 border-banano-yellow/25 [&>*]:px-1 [&>*]:sm:px-3 text-left">
                    <td>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={service.website}
                        className="text-banano-yellow hover:text-accent-secondary"
                      >
                        {service.name}
                      </a>
                    </td>
                    {/* Numerical data should be right-aligned for easier comparisons at a glance*/}
                    <td className="text-right tabular-nums">
                      {service.requests}
                    </td>
                  </tr>
                );
              })}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {new Array(30).fill({}).map((_, index) => {
                return (
                  <tr className="[&>*]:first:pt-4 [&>*]:py-1 border-b-1 border-banano-yellow/25 [&>*]:px-1 [&>*]:sm:px-3 text-left">
                    <td>
                      <Skeleton text="Dummy Service" />
                    </td>
                    <td className="flex justify-end">
                      <Skeleton text="12560" />
                    </td>
                  </tr>
                );
              })}
            </React.Fragment>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Services;

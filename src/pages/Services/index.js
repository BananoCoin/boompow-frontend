import React from "react";
import { Skeleton } from "components/Skeleton";
import { useMainStore } from "stores";
import { useNavigate, useParams } from "react-router-dom";

const Services = () => {
  const { stats } = useMainStore();

  let navigate = useNavigate();

  React.useEffect(() => {
    if (!stats || !stats.services) {
      navigate("/");
    }
  });

  return (
    <div className="bg-dark p-2 rounded rounded-l-none w-full max-w-3xl h-5/6 overflow-y-scroll border-banano-yellow border-l-4">
      <table className="text-gray-300 table-auto w-full">
        <thead>
          <tr className="[&>*]:font-medium table-fixed [&>*]:py-2 border-b-2 border-banano-yellow/25 [&>*]:px-1 [&>*]:sm:px-3 text-left">
            <th>Name</th>
            <th>Total Requests</th>
          </tr>
        </thead>
        <tbody>
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
                  <td>{service.requests}</td>
                </tr>
              );
            })}
          </React.Fragment>
        </tbody>
      </table>
    </div>
  );
};

export default Services;

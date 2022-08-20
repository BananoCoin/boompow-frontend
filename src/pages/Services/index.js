import React from "react";
import Stats from "api/Stats";
import { Skeleton } from "components/Skeleton";

const Services = () => {
  const [services, setServices] = React.useState(null);

  const refreshServices = async () => {
    try {
      const services = await Stats.services();
      setServices(
        services.sort((a, b) =>
          Number(a.amountOfRequests) > Number(b.amountOfRequests) ? -1 : 1
        )
      );
      console.log(services);
    } catch (e) {
      // TODO: HANDLE ERROR
      setServices([]);
    }
  };

  React.useState(() => {
    refreshServices();
  }, []);

  return (
    <div className="bg-dark p-2 rounded rounded-l-none w-full max-w-3xl h-5/6 overflow-y-scroll border-banano-yellow border-l-4">
      <table className="text-gray-300 w-full">
        <thead>
          <tr className="[&>*]:font-medium table-fixed [&>*]:py-2 border-b-2 border-banano-yellow/25">
            <th>Name</th>
            <th>Website</th>
            <th>Requests</th>
          </tr>
        </thead>
        <tbody>
          {services ? (
            <React.Fragment>
              {services.map((service) => {
                return (
                  <tr className="[&>*]:first:pt-4 [&>*]:py-1 border-b-1 border-banano-yellow/25 [&>*]:px-1 [&>*]:sm:px-4 [&>*]:md:px-12">
                    <td>{service.name}</td>
                    <td>
                      <a href={service.website}>{service.website}</a>
                    </td>
                    <td className="text-right">{service.amountOfRequests}</td>
                  </tr>
                );
              })}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {new Array(30).fill({}).map((_, index) => {
                return (
                  <tr className="[&>*]:first:pt-4 [&>*]:py-1 border-b-1 border-banano-yellow/25 [&>*]:px-1 [&>*]:md:px-12">
                    <td>
                      <Skeleton text="Dummy Service" />
                    </td>
                    <td>
                      <Skeleton text="https://dummy.service" />
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

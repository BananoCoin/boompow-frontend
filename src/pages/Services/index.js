import React from "react";
import Stats from "api/Stats";

const Services = () => {
  const [services, setServices] = React.useState([]);

  const refreshServices = async () => {
    try {
      const services = await Stats.services();
      setServices(services);
      console.log(services);
    } catch (e) {
      // TODO: HANDLE ERROR
    }
  };

  React.useState(() => {
    refreshServices();
  }, []);

  return (
    <div className="bg-dark p-2 rounded rounded-l-none h-5/6 overflow-y-scroll border-banano-yellow border-l-4">
      <table className="text-gray-300 ">
        <thead>
          <tr className="[&>*]:font-medium table-fixed [&>*]:py-2 border-b-2 border-banano-yellow/25">
            <th>Name</th>
            <th>Website</th>
            <th>Requests</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => {
            return (
              <tr className="[&>*]:py-1 border-b-1 border-banano-yellow/25 [&>*]:px-1 [&>*]:md:px-12">
                <td>{service.name}</td>
                <td>
                  <a href={service.website}>{service.website}</a>
                </td>
                <td className="text-right">{service.amountOfRequests}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Services;

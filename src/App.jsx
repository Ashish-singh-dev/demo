import { Table, message } from "antd";
import { useEffect, useState } from "react";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

function App() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        if (!data) {
          message.error("No data found");
          return;
        }
        const filteredData = data.map((item) => ({
          key: item.id,
          name: item.name,
          username: item.username,
          email: item.email,
          address: `${item.address.street}, ${item.address.city}`,
        }));
        if (!filteredData || !filteredData.length) {
          message.info("No data found to show");
          return;
        }
        setDataSource(filteredData);
      } catch (error) {
        message.error(error.toString());
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return <Table dataSource={dataSource} columns={columns} loading={loading} />;
}

export default App;

import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageData, setPageData] = useState([]);
  const totalPage = Math.ceil(data.length / 10);

  function handlePrevious() {
    setCurrentPage(currentPage - 1);
  }

  function handleNext() {
    setCurrentPage(currentPage + 1);
  }

  useEffect(() => {
    const startIndex = (currentPage - 1) * 10;
    let endIndex = startIndex + 9;
    if (endIndex > data.length - 1) {
      endIndex = data.length - 1;
    }
    const array = new Array();
    for (let i = startIndex; i <= endIndex; i++) {
      array.push(data[i]);
    }
    setPageData(array);
  }, [currentPage, data]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        console.log(error.message)
        alert("failed to fetch data");
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Employee Data Table</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {pageData.length > 0 &&
            pageData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="buttons">
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <div className="cp">{currentPage}</div>
        <button onClick={handleNext} disabled={currentPage === totalPage}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;

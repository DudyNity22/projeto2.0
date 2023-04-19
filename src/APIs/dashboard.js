import React, { useState, useEffect, useRef } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import moment from 'moment';
import '../css/all.css'

function CveList() {
  const [cves, setCves] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const intervalRef = useRef(null); // useRef para armazenar o intervalo

  useEffect(() => {
    fetchData(); // realiza a primeira busca

    // verifica se o intervalo já existe antes de criá-lo
    if (!intervalRef.current) {
      intervalRef.current = setInterval(fetchData, 60000); // busca a cada 1 minuto
    }

    return () => clearInterval(intervalRef.current); // limpa o intervalo quando o componente for desmontado
  }, []);

  const fetchData = () => {
    Promise.all([
      fetch("https://api.cvesearch.com/search?q=intelbras/").then((response) =>
        response.json()
      ),
      fetch("https://api.cvesearch.com/search?q=mikrotik/").then((response) =>
        response.json()
      ),
      fetch("https://api.cvesearch.com/search?q=ubiquiti/").then((response) =>
        response.json()
      ),
    ])
      .then((data) => {
        const cvesArray = [];
        data.forEach((response, index) => {
          const vendor = ['Intelbras', 'Mikrotik', 'Ubiquiti'][index];
          for (const cveid in response.response) {
            const date = moment(response.response[cveid].basic.date_created).format("YYYY/MM/DD");
            const url = response.response[cveid].basic.mitre_url;
            const timestamp = Date.parse(date); // adiciona a propriedade timestamp
            cvesArray.push({ vendor: vendor, url: url, date: date, timestamp: timestamp });
          }
        });
        const sortedCves = cvesArray.sort((a, b) => b.timestamp - a.timestamp);

        const latestCves = sortedCves.slice(0, 18); // obtém os 20 mais recentes
        setCves(latestCves);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  };

  const handleRefresh = () => {
    setIsLoading(true);
    fetchData();
  };

  return (
    <div className="geral">
    <div className="btn-update">
      <Button onClick={handleRefresh}>
        <i class="fa-solid fa-arrows-rotate fa-2xl"></i>
      </Button>
    </div><div className="tabela">
        {isLoading ? (
          <p className="load"></p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Empresa</th>
                <th>URL</th>
                <th>Data de criação</th>
              </tr>
            </thead>
            <tbody>
              {cves.map((cve) => (
                <tr key={cve.url}>
                  <td>{cve.vendor}</td>

                  <td>
                    <a href={cve.url} target="_blank" rel="noreferrer">
                      {cve.url}
                    </a>
                  </td>
                  <td>{cve.date}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div></div>
  );
}

export default CveList;

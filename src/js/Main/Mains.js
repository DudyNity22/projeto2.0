import React from 'react';
import "../../css/all.css";
import CveList from '../../APIs/dashboard';




function Tabela() {

   

    return (
        <main>
            <div>
            <CveList/>
            </div>
        </main>
    )
}


export default Tabela;
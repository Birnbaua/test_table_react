import React, { useEffect, useState } from "react";
import exampleData from './table/exampledata.json';
import {ReactTabulator} from '@rnwelsh/react-tabulator';
import "@rnwelsh/react-tabulator/lib/css/styles.css"; // default theme
import "@rnwelsh/react-tabulator/lib/css/tabulator.min.css"; 
import "luxon"
import GameroundToolbar from "./GameroundToolbar";

function TestState(props) {

    const rowColors = ["#ABEBC6","#FAD7A0","#AED6F1","#F9E79F","#D2B4DE"]

    const[columns, setColumns] = useState([])
    const[rows, setRows] = useState([])
    const[data, setData] = useState([])
    const[search, setSearch] = useState("")
    const [tableKey, setTableKey] = useState(1234)

    useEffect(() => {
        setData(exampleData)
    },[])

    useEffect(() => {
        setRows(data)
    },[data])

    useEffect( () => {
        const sets = rows.map(row => row.sets != null ? row.sets.length : 0)
        let arr = [
            {field: "match_no", title: 'Spiel Nr.', widthGrow: 0.25, headerSort: false, editable: false},
            {field: "round", title: 'Runde', widthGrow: 0.25, headerSort: false, editable: false},
            {field: "start", title: 'Start', widthGrow: 0.25, headerSort: false, editable: true, editor: 'time'},
            {field: "field.no", title: 'Feld Nr.', widthGrow: 0.25, headerSort: false, editable: false},
            {field: "field.name", title: 'Feld', widthGrow: 0.5, headerSort: false, editable: false},
            {field: "team_a.name", title: 'Team A', widthGrow: 0.5, headerSort: false, editable: false},
            {field: "team_b.name", title: 'Team B', widthGrow: 0.5, headerSort: false, editable: false},
            {field: "referee.name", title: 'Schiedsrichter', widthGrow: 0.5, headerSort: false, editable: false},
        ]
        for (let i = 0;i<Math.max(...sets);i++) {
            arr.push({field: "sets."+ i +".points_a", title: 'Satz'+ i +' a' , widthGrow: 0.2, headerSort: false, editable: true, editor: "number"})
            arr.push({field: "sets."+ i +".points_b", title: 'Satz'+ i +' b' , widthGrow: 0.2, headerSort: false, editable: true, editor: "number"})
        }
        setColumns(arr)
    }, [rows])
    

    useEffect(() => {
        setTableKey(tableKey => tableKey + 1)
    }, [columns])

    useEffect(() => {
        if(search.length > 0) {
            let arr = rows.filter(row => 
                search.match(row.team_a.name)
            )
            setRows(arr)
        } else {
            setRows(data)
        }
    }, [search])

    return (
        <div>
            <GameroundToolbar></GameroundToolbar>
            <h1>{props.title || 'Titel'}</h1>
            <ReactTabulator
                key={tableKey}
                data={rows} columns={columns}
                layout={'fitColumns'}
                rowFormatter={function(row){
                    //row - row component
                    row.getElement().style.backgroundColor = rowColors[row.getData().round%rowColors.length];
                }
            }
            />
     </div>
    );
}

export default TestState
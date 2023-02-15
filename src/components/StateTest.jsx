import React, { useEffect, useState } from "react";
import exampleData from './table/exampledata.json'
import {ColumnDefinition, ReactTabulator} from '@rnwelsh/react-tabulator'
import "@rnwelsh/react-tabulator/lib/css/styles.css"; // default theme
import "@rnwelsh/react-tabulator/lib/css/tabulator.min.css"; 
import "luxon"

function TestState(props) {

    const rowColors = ["#ABEBC6","#FAD7A0","#AED6F1","#F9E79F","#D2B4DE"]

    const[columns, setColumns] = useState([])
    const[rows, setRows] = useState([])

    useEffect(() => {
        setRows(exampleData)
    },[])

    useEffect( () => {
        if(rows.length >= 0) {
            var sets = rows.map(row => {if(row.sets != null){return row.sets.length}else{return 0}})
            //var setNo = Math.floor(Math.max(...sets))
            var arr = [
                {field: "match_no", title: 'Spiel Nr.', widthGrow: 0.25, headerSort: false, editable: false},
                {field: "round", title: 'Runde', widthGrow: 0.25, headerSort: false, editable: false},
                {field: "start", title: 'Start', widthGrow: 0.25, headerSort: false, editable: true, editor: 'time'},
                {field: "field.no", title: 'Feld Nr.', widthGrow: 0.25, headerSort: false, editable: false},
                {field: "field.name", title: 'Feld', widthGrow: 0.5, headerSort: false, editable: false},
                {field: "team_a.name", title: 'Team A', widthGrow: 0.5, headerSort: false, editable: false},
                {field: "team_b.name", title: 'Team B', widthGrow: 0.5, headerSort: false, editable: false},
                {field: "referee.name", title: 'Schiedsrichter', widthGrow: 0.5, headerSort: false, editable: false},
            ]
            for(let i = 0;i<props.sets||3;i++) {
                arr = arr.concat([{field: "sets."+ i +".points_a", title: 'Satz'+ i +' a' , widthGrow: 0.2, headerSort: false, editable: true, editor: "number"}])
                arr = arr.concat([{field: "sets."+ i +".points_b", title: 'Satz'+ i +' b' , widthGrow: 0.2, headerSort: false, editable: true, editor: "number"}])
            }
            setColumns(columns => arr)
        }
    }, [rows])

    

    return (
        <div>
            <ReactTabulator 
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
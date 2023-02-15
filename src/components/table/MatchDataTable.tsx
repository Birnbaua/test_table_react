import React from "react"
import { Component, ReactNode } from 'react'
import exampleData from './exampledata.json'
import {ColumnDefinition, ReactTabulator} from '@rnwelsh/react-tabulator'
import "@rnwelsh/react-tabulator/lib/css/styles.css"; // default theme
import "@rnwelsh/react-tabulator/lib/css/tabulator.min.css"; 

interface MatchSet{
    points_a: number
    points_b: number
}

interface Team{
    no: string
    name: string
}

interface Field{
    no: String
    name: String
}

interface Match{
    match_no?: string
    round: number
    start?: string
    field?: Field
    team_a?: Team
    team_b?: Team
    referee?: Team
    sets?: Array<MatchSet>
}

interface TableProps {
    title?: string
}

interface TableState {
    rows?: Array<Match>
    columnDefinition?: Array<ColumnDefinition>
}

const rowColors = ["#ABEBC6","#FAD7A0","#AED6F1","#F9E79F","#D2B4DE"]


class MatchDataTable extends Component<TableProps,TableState> {
    constructor(props: TableProps) {
        super(props);
    }

    state = {
        rows: exampleData,
        columnDefinition: [
            {field: "match_no", title: 'Spiel Nr.', widthGrow: 0.25, headerSort: false, editable: false, editor: "input",},
            {field: "round", title: 'Runde', widthGrow: 0.25, headerSort: false, editable: false, editor: "input",},
            {field: "start", title: 'Start', widthGrow: 0.25, headerSort: false, editable: true, editor: "input"},
            {field: "field.no", title: 'Feld Nr.', widthGrow: 0.25, headerSort: false, editable: false, editor: "input",},
            {field: "field.name", title: 'Feld', widthGrow: 0.5, headerSort: false, editable: false, editor: "input"},
            {field: "team_a.name", title: 'Team A', widthGrow: 0.5, headerSort: false, editable: false, editor: "input"},
            {field: "team_b.name", title: 'Team B', widthGrow: 0.5, headerSort: false, editable: false, editor: "input"},
            {field: "referee.name", title: 'Schiedsrichter', widthGrow: 0.5, headerSort: false, editable: false, editor: "input"},
        ]
    }

    componentDidMount(): void {
        if(this.state.rows.length != 0) {
            var sets: Array<number> = this.state.rows.map(row => {if(row.sets != null){return row.sets.length}else{return 0}})
            var setNo: number = Math.max(...sets)
            console.log("Number of sets: " + Math.max(...sets))
            for(let i = 0;i<setNo;i++) {
                this.state.columnDefinition.push({field: "sets."+ i +".points_a", title: 'Satz'+i+' a' , widthGrow: 0.2, headerSort: false, editable: true, editor: "input"})
                this.state.columnDefinition.push({field: "sets."+ i +".points_b", title: 'Satz'+i+' b' , widthGrow: 0.2, headerSort: false, editable: true, editor: "input"})
            }
        }
    }

    componentWillUnmount(): void {
        this.state.columnDefinition = []
    }

    render() : ReactNode {
        return (        
            <div>
                <ReactTabulator 
                    data={this.state.rows} columns={this.state.columnDefinition}
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
}

export default MatchDataTable
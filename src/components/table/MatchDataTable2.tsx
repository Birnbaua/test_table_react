import React from "react";
import { Component, ReactNode } from 'react';
import exampleData from './exampledata.json';
import {ColumnDefinition, ReactTabulator} from '@rnwelsh/react-tabulator';
import "@rnwelsh/react-tabulator/lib/css/styles.css"; // default theme
import "@rnwelsh/react-tabulator/lib/css/tabulator.min.css"; 
import "luxon"

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
    desc?: string
}

interface TableState {
    rows?: Array<Match>
    columnDefinition?: ColumnDefinition[]
}

const rowColors = ["#ABEBC6","#FAD7A0","#AED6F1","#F9E79F","#D2B4DE"]


class MatchDataTable2 extends Component<TableProps> {
    constructor(props: TableProps) {
        super(props);
        this.state = {
            testState: "EUREKA"
        }
    }

    rows = exampleData
    columnDefinition = new Array<ColumnDefinition>()
    testState = "FAILED"

    componentDidMount(): void {
        if(this.rows.length !== 0) {
            var sets: Array<number> = this.rows.map(row => {if(row.sets != null){return row.sets.length}else{return 0}})
            var setNo: number = Math.max(...sets)
            console.log("Number of sets: " + Math.max(...sets))
            
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
            this.columnDefinition.push(...arr)
            for(let i = 0;i<setNo;i++) {
                this.columnDefinition.push({field: "sets."+ i +".points_a", title: 'Satz'+i+' a' , widthGrow: 0.2, headerSort: false, editable: true, editor: "number"})
                this.columnDefinition.push({field: "sets."+ i +".points_b", title: 'Satz'+i+' b' , widthGrow: 0.2, headerSort: false, editable: true, editor: "number"})
            }
            //this.setState({testState: "EUREKA"})
            this.testState = "EUREKA"
            console.log("Column list: " + this.columnDefinition.length)
        }
    }

    componentWillUnmount(): void {
        this.columnDefinition = []
    }

    render() : ReactNode {
        return (        
            <div>
                <h1>{this.testState}</h1>
                <ReactTabulator 
                    data={this.rows} columns={this.columnDefinition}
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

export default MatchDataTable2
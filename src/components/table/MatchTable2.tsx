import React from "react"
import { Component, ReactNode } from 'react'
import { Paper,TableContainer,Table,TableRow,TableCell,TableHead,TableBody } from "@mui/material"
import exampleData from './exampledata.json'
import { makeStyles } from "@mui/styles"
import { ClassNames } from "@emotion/react"


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

const cellStyle = {
    width: "10",
    maxWidth: 300,
    overflow: "hidden",
    textOverflow: "ellipsis",
    borderStyle: "border-box",
    whiteSpace: 'nowrap'
}

const rowColors = ["#ABEBC6","#FAD7A0","#AED6F1","#F9E79F","#D2B4DE"]



class MatchTable2 extends Component<Array<Match>> {


    constructor(props: any) {
        super(props);
    }
    
    rows: Array<Match> = exampleData

    handleBlur = (cell) => {
        console.log(cell)
      };

    render(): ReactNode {
        return (<TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650}} size="small" aria-label="a dense table">
                    <TableHead style={{backgroundColor: 'orange'}}>
                        <TableRow >
                            <TableCell align="left" width="2%"><strong>Spiel</strong></TableCell>
                            <TableCell align="left" width="5%"><strong>Runde</strong></TableCell>
                            <TableCell align="left" width="10%"><strong>Start</strong></TableCell>
                            <TableCell align="left" width="5%"><strong>Feld Nr.</strong></TableCell>
                            <TableCell align="left" width="10%"><strong>Feld</strong></TableCell>
                            <TableCell align="left" width="10%"><strong>Team A</strong></TableCell>
                            <TableCell align="left" width="10%"><strong>Team B</strong></TableCell>
                            <TableCell align="left" width="10%"><strong>Schiedsrichter</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.rows.map((row) => (
                        <TableRow
                            key={row.match_no}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: rowColors[row.round%rowColors.length] }}
                        >
                            <TableCell component="th" scope="row">{row.match_no}</TableCell>
                            <TableCell align="left" contentEditable={true} onChange={this.handleBlur}>{row.round}</TableCell>
                            <TableCell align="left">{row.start}</TableCell>
                            <TableCell align="left">{row.field?.no}</TableCell>
                            <TableCell align="left"><div style={cellStyle}>{row.field?.name}</div></TableCell>
                            <TableCell align="left"><div style={cellStyle}>{row.team_a?.name}</div></TableCell>
                            <TableCell align="left"><div style={cellStyle}>{row.team_b?.name}</div></TableCell>
                            <TableCell align="left"><div style={cellStyle}>{row.referee?.name}</div></TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>);
    }
}

export default MatchTable2
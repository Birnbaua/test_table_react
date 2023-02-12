import MaterialTable from "material-table";
import Table from "@mui/material";
import '../../App.css';
import { createTheme, ThemeProvider, iconClasses} from "@mui/material";
import React, { Component, forwardRef } from "react";
import exampleData from './exampledata.json'
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

class MatchTable extends Component {
    constructor(props) {
        super(props);
        this.state = {isLoading: true, title: "Title", columns: []};
    }

    rowColors = ["table-primary","table-secondary","table-success","table-danger","table-warning"]
    

    componentDidMount() {
        this.setState({ 
            columns: [
                {title: "Spiel", field: "match_no"},
                {title: "Runde", field: "round", width: "45%"},
                {title: "Zeit", field: "start", width: "15%"},
                {title: "Feldnr.", field: "field.no", width:"5%"},
                {title: "Feldname", field: "field.name", width:"10%", cellStyle: { padding: "5px", overflow: "hidden", textOverflow: "ellipsis" }},
                {title: "Team A", field: "team_a.name", width:"10%", cellStyle: { padding: "5px", overflow: "hidden", textOverflow: "ellipsis" }},
                {title: "Team B", field: "team_b.name", width:"10%", cellStyle: { padding: "5px", overflow: "hidden", textOverflow: "ellipsis" }},
                {title: "Schiedsrichter", field: "referee.name", width:"10%", cellStyle: { padding: "5px", overflow: "hidden", textOverflow: "ellipsis" }},
            ]
        })
    }

    render() {
        return (
            <div style={{position: 'static', top: 50}}>
            
            <ThemeProvider theme={createTheme()}>
                <MaterialTable 
                    title={"Vorrunde"} 
                    icons={tableIcons} 
                    maxBodyHeight="80%"
                    columns={this.state.columns} 
                    data={exampleData}
                    options={{
                        paging: false,
                        maxBodyHeight: '80',
                        exportButton: true, exportAllData: true,
                        tableLayout: "fixed",
                        headerStyle: {
                            backgroundColor: '#01579b',
                            color: '#FFF',
                            fontWeight: "bold",
                        },
                        rowStyle: (rowData) => {
                            return {
                                backgroundColor: rowData.match_no === '2' ? 'red' : 'blue'
                            }
                        }
                    }}></MaterialTable>
            </ThemeProvider>
            </div>
        )
    }
    
}

export default MatchTable
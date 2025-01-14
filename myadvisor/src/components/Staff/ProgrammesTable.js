import React, { useState, useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone} from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import filterFactory, { selectFilter  } from 'react-bootstrap-table2-filter';
import { Modal, Tabs, Tab, Button } from "react-bootstrap";
import AddCourseToProgramme from "./AddCourseToProgramme";
import PullProgrammes from "../PullProgrammes";
import PullCourses from "../PullCourses";

//TABLE SETUP

/*
    columns is used to display specific columns of the data on the table.
*/
const columns = [
    { dataField: 'name', text: 'Programme', csvText: 'name', sort: true },
]


// const columns = [
//     { dataField: 'courseCode', text: 'Course Code', csvText: 'Course Code', sort: true },
//     { dataField: 'courseTitle', text: 'Course Title', csvText: 'Course Title' },
//     { dataField: 'level', text: 'Level', csvText: 'Level' },
//     { dataField: 'prerequisites', text: 'Pre-requisites', csvText: 'Pre-requisites' },
// ]

// const pCol = this.state.programmes;

// // Get the keys of the first item in the programmes array (pCol)
// const pColKeys = Object.keys(pCol[0]);

// const updatedColumns = [
//     columns,
//     pColKeys.map(key => ({
//         dataField: key,
//         text: key,
//         csvText: key
//     }))
// ];
/*
    selectLevelOptions allows you to filter the level table column
*/
const selectLevelOptions = {
    I: 'I',
    II: 'II',
    III: 'III'
};

/*
    selectSemesterOptions allows you to filter the semester table column
*/
const selectSemesterOptions = {
    1: '1',
    2: '2',
    3: '3'
};

/*
    selectTypeOptions allows you to filter the type table column
*/
const selectTypeOptions = {
    Core: 'Core',
    Elective: 'Elective',
    Foundation: 'Foundation'
};

/*
    coursesColumns is used to display specific columns of the data on the courses table in the modal.
    It also contains code that enables the columns to be filtered.
*/
const coursesColumns = [
    { 
        dataField: 'level', 
        text: 'Level', 
        sort: true,
        formatter: cell => selectLevelOptions[cell],
        filter: selectFilter({
            options: selectLevelOptions,
        })
    },
    { 
        dataField: 'semester', 
        text: 'Semester', 
        sort: true,
        formatter: cell => selectSemesterOptions[cell],
        filter: selectFilter({
            options: selectSemesterOptions,
        })
    },
    { 
        dataField: 'type', 
        text: 'Type', 
        sort: true,
        formatter: cell => selectTypeOptions[cell],
        filter: selectFilter({
            options: selectTypeOptions,
        })
    },
    { dataField: 'courseCode', text: 'Course Code', sort: true },
    { dataField: 'courseTitle', text: 'Course Title', sort: true },
]

/*
    defaultSorted and coursesSorted sorts the tables is ascending order based on the name column and level column respectively.
*/
const defaultSorted = [{
    dataField: 'name',
    order: 'asc'
}];

const coursesSorted = [{
    dataField: 'level',
    order: 'asc'
}];

/*
    options and courseOptions is used to configure the tables pagination.
*/
const options = {
    custom: true,
    paginationSize: 5,
    pageStartIndex: 1,
    firstPageText: 'First',
    prePageText: 'Back',
    nextPageText: 'Next',
    lastPageText: 'Last',
    sizePerPage: 8,
};

const courseOptions = {
    sizePerPage: 8,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true
};

const { SearchBar, ClearSearchButton  } = Search;
const { ExportCSVButton } = CSVExport;

/*
    ProgrammesTable is a component that displays the programmes in the system in a table.
*/
function ProgrammesTable({programmes, loading}) {

    /*
        The show state is used to keep track of the visibility of the view programme courses modal.
        It's initial state is false.
        handleShow sets the show state to true, which displays the modal.
        handleClose sets the show state to false, which closes the modal.
    */ 
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    /*
        The showAddCourseProg state is used to keep track of the visibility of the addCourseToProgramme modal.
        It's initial state is false.
        handleShowCourses sets the show state to true, which displays the modal.
        handleCloseCourses sets the show state to false, which closes the modal.
    */ 
    const [showAddCourseProg, setShowAddCourseProg] = useState(false);
    const handleShowCourses = () => setShowAddCourseProg(true);
    const handleCloseCourses = () => setShowAddCourseProg(false);

    /*
        The programmeName state is used to keep track of the selected programme name.
        The programmeCourses state is used to store the courses of the selected programme.
        The loadingCourses state is used to keep track of getting the courses from the server. 
    */    
    const [programmeName, setprogrammeName] = useState([]);
    const [programmeCourses, setProgrammeCourses] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(true);

    /*
        rowEvents is used to get the programme name of the selected row and get the courses of that programme.
    */      
    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            setprogrammeName(row.name);
            getProgrammeCourses(row.id);
        }
    };    

    /*
        refreshTable sets the loading state to true and gets the programmes from the system.
    */
        function refreshTable(){
            //setLoading(true);
            //getProgrammes();
        }

    /*
        getProgrammeCourses creates a get request to the server that gets all the courses of this specified programme on the system and stores it in the programmeCourses state.
    */
    async function getProgrammeCourses(id) {
        try {
            setShow(true);
            setProgrammeCourses([]);
            setLoadingCourses(true);

            const res = await fetch("/programmes/offered-courses/" + id, {
            method: "GET",
        });
            const parseData = await res.json();
            setProgrammeCourses(parseData);
            setLoadingCourses(false);
            
            
        } catch (err) {
            console.error(err.message);
        }
    }

    /*
        ToolkitProvider is a wrapper for the BootstrapTable context and the related search, export csv and clear search react contexts.  
    */ 
    const table = ({ paginationProps, paginationTableProps }) => (
        <>
            <ToolkitProvider
                    keyField="name"
                    data={ programmes }
                    columns={ columns }
                    search
                    exportCSV={{
                        fileName: 'programmes.csv',
                    }}
                >
                {
                    props => (
                    <div>
                        <SearchBar { ...props.searchProps } />
                        <ClearSearchButton { ...props.searchProps } />
                        <ExportCSVButton { ...props.csvProps }>Export CSV</ExportCSVButton>
                        <BootstrapTable { ...props.baseProps } { ...paginationTableProps } defaultSorted={ defaultSorted } rowEvents={ rowEvents } hover/>
                    </div>
                    )
                }
            </ToolkitProvider>
            <PaginationListStandalone { ...paginationProps } />
        </>
    );

    return (
        <>
            {loading ? (
            <div class="d-flex justify-content-center">
                <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
                </div>
            </div>
            ) : (
            <PaginationProvider pagination={paginationFactory(options)}>
                { table }
            </PaginationProvider>
            )}

            <Modal show={show} onHide={handleClose} size="xl">
              <Modal.Header closeButton>
                  <Modal.Title>{programmeName}</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                {loadingCourses ? (
                <div class="d-flex justify-content-center">
                    <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                    </div>
                </div>
                ) : (
                
                <ToolkitProvider
                    keyField="courseCode"
                    data={ programmeCourses }
                    columns={ coursesColumns }
                    search
                    >
                    
                    {
                        props => (
                        <div>
                            <SearchBar { ...props.searchProps } />
                            <ClearSearchButton { ...props.searchProps } />
                            {/*<div class="float-right"><Button onClick={handleShowCourses} class="btn btn-custom">Add Course</Button></div>*/}
                            <BootstrapTable
                            { ...props.baseProps } pagination={ paginationFactory(courseOptions) } defaultSorted={ coursesSorted } filter={ filterFactory() }
                            />
                            
                        </div>
                        )
                    }
                </ToolkitProvider>
                )}                           
              </Modal.Body>
                
            </Modal>  

            <Modal show={showAddCourseProg} onHide={handleCloseCourses} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add Course to {programmeName}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <AddCourseToProgramme setShowAddCourseProg={setShowAddCourseProg}/>
                </Modal.Body>   
            </Modal>

            



        </>
    );


}

export default ProgrammesTable;

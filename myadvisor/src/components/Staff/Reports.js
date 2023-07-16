import React, { useState, useEffect } from "react";
import ReportsTable from './ReportsTable';
import {Jumbotron, Container} from 'react-bootstrap';

/*
    Reports is a component that displays the reports table component.
*/

function Reports() {
    /*
    const [sessions, setSessions] = useState([
        {studentID: 816000000, name: "Jane Doe", year: 1, advisingDate: "1/1/2021", status: "Complete"},
        {studentID: 816000001, name: "John Doe", year: 2, advisingDate: "1/1/2021", status: "Complete"},
        {studentID: 816000002, name: "Jack Doe", year: 3, advisingDate: "1/1/2021", status: "Incomplete"}
    ]);
    const [loading, setLoading] = useState(false);*/

    /*
        The sessions state is used store all the sessions that will be displayed in the table.
        The students state is used to store all students on ths system.
    */ 
    const [sessions, setSessions] = useState([]);
    const [students, setStudents] = useState([]);

    /*
        getSessions creates a get request to the server that gets all the sessions on the system and stores it in the sessions state.
    */
    async function getSessions() {
        try {
            const res = await fetch("/admin/academic-advising/students/sessions", {
            method: "GET",
        });
            const parseData = await res.json();
            setSessions(parseData);

        } catch (err) {
            console.error(err.message);
        }
    }

    /*
        getStudents creates a get request to the server that gets all the students on the system and stores it in the students state.
    */
    async function getStudents() {
        try {
            const res = await fetch("/transcript/details/all", {
            method: "GET",
        });
            const parseData = await res.json();
            setStudents(parseData);
            
        } catch (err) {
            console.error(err.message);
        }
    }
    
    useEffect(() => {
        getSessions();
        getStudents();
    }, []);    

    return (
        <>
            <Jumbotron fluid>
                <Container>
                    <h2>Reports</h2>
                </Container>
            </Jumbotron>
            <div class="container">
                <div class="row mt-4">
                    {/* Courses Table */}
                    <div class="col-10">
                        <div class="card h-100">
                            <div class="card-body shadow-sm">
                                <ReportsTable sessions={sessions} students={students}/>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div class="col">
                        <button type="button" class="btn btn-custom add-course" >Archive</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Reports;
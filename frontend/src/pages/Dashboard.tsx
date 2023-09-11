import { useState, useEffect } from 'react';
import Dashboard from '../layouts/dashboard';
import 'chart.js/auto';


export default function About() {

    return (
        <Dashboard >
            <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
            </div>
        </Dashboard>
    );
}


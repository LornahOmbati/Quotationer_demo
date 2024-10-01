import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; // Make sure you import Link from the correct library


function About() {

  return (
    <div className="about">
      <h1>About Us</h1>
        <h3>
          Welcome to our Quote/Invoice Generator!
        </h3>
            <p className="text-slate-700 text-center text-xl lg:w-2/3 lg:mx-auto">
                    Quotation/Invoice Generator is a quoting/invoicing application designed 
                    and built by Lorna Ombati,
                    whose main purpose is to - as the name suggests - create
                    quotes/invoices.
                  </p>
                  <p className="text-slate-700 text-center text-xl lg:w-2/3 lg:mx-auto mt-5">
                    Please note that even though most of the functionality is done,
                    there are still some things to add such as improving the Login and Logout experience. 
                  </p>
            <h3>
          Follow these steps to easily generate a custom quote/invoice for your needs:
        </h3>
      <ol>
        <li><strong>Enter Details</strong>: Fill in the required fields such as quantity, specifications, or any customizations.</li>
        <li><strong>Generate Quote/Invoice</strong>: Click the "Generate Quote/Invoice" button, and your quote/Invoice will be generated and downloaded as a pdf..</li>
      </ol>
      <p>
        If you have any questions or notice any bugs - ie.,application not working as it should -, feel free to reach out via our <Link to="/help">Help page</Link> to make a report or give feedback !
      </p>
      
    </div>
  );
}

export default About;

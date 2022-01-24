<?php

    $to = "ben@investuncommon.com";

    $message = '<table style="background: #ffffff; margin: 0 auto;" width="100%" cellspacing="0" cellpadding="0">

                <thead>

                    <tr>

                        <td style="padding: 20px; text-align: center; background: #000C45" colspan="2">

                            <img src="https://investuncommon.com/images/header_logo.png" alt="logo" width="180" height="auto" />

                        </td>

                    </tr>

                </thead>

                <tbody>';

                $subject = $_POST['subject'];

                $message .= '<tr style="background-color: #ffffff;">
        
                                <td style="width: 15%; padding: 10px 20px;"><strong>Name: </strong></td>
        
                                <td style="width: 85%; padding: 10px 20px; text-align: left;">'.$_POST['fname'] . " " . $_POST['lname'].'</td>
        
                            </tr>
        
                            <tr style="background-color: #ffffff;">
        
                                <td style="width: 15%; padding: 10px 20px;"><strong>Email: </strong></td>
        
                                <td style="width: 85%; padding: 10px 20px; text-align: left;">'.$_POST['email'].'</td>
        
                            </tr>

                            <tr style="background-color: #ffffff;">
        
                                <td style="width: 15%; padding: 10px 20px;"><strong>Phone: </strong></td>
        
                                <td style="width: 85%; padding: 10px 20px; text-align: left;">'.$_POST['phone'].'</td>
    
                            </tr>
        
                            <tr style="background-color: #ffffff;">
        
                                <td style="width: 15%; padding: 10px 20px;"><strong>Zip Code: </strong></td>
        
                                <td style="width: 85%; padding: 10px 20px; text-align: left;">'.$_POST['zip'].'</td>
        
                            </tr>

                            <tr style="background-color: #ffffff;">
        
                                <td style="width: 15%; padding: 10px 20px;"><strong>Investor Type: </strong></td>
        
                                <td style="width: 85%; padding: 10px 20px; text-align: left;">'.$_POST['itype'].'</td>
        
                            </tr>

                            <tr style="background-color: #ffffff;">
        
                                <td style="width: 15%; padding: 10px 20px;"><strong>Which property types are you interested in? </strong></td>
        
                                <td style="width: 85%; padding: 10px 20px; text-align: left;">'.Trim(stripslashes(implode(", ", $_POST['ptype']))).'</td>
        
                            </tr>
                            <tr style="background-color: #ffffff;">
        
                                <td style="width: 15%; padding: 10px 20px;"><strong>What are your investment objectives? </strong></td>
        
                                <td style="width: 85%; padding: 10px 20px; text-align: left;">'.Trim(stripslashes(implode(", ", $_POST['objective']))).'</td>
        
                            </tr> 
                
                            <tr style="background-color: #ffffff;">
        
                                <td style="width: 15%; padding: 10px 20px;"><strong>Investor Status: </strong></td>
        
                                <td style="width: 85%; padding: 10px 20px; text-align: left;">'.$_POST['istatus'].'</td>
        
                            </tr>
                
                            <tr style="background-color: #ffffff;">
        
                                <td style="width: 15%; padding: 10px 20px;"><strong>What is your typical investment amount per offering? </strong></td>
        
                                <td style="width: 85%; padding: 10px 20px; text-align: left;">'.$_POST['amount'].'</td>
        
                            </tr> 
                            
                            ';

    $message .= '</tbody>

                <tfoot>

                    <tr>

                        <td style="padding: 5px; background: #ffffff;" colspan="2">

                            <p style="text-align: center; color: #000000; font-size: 14px; margin: 10px 0;">

                            Copyright 2022 Uncommon Capital Group. All Rights Reserved

                            </p>

                        </td>

                    </tr>

                </tfoot>

            </table>';

    $header = "From: UCG Form <form@uncommoncapitalgroup.com> \r\n";

    $header .= "MIME-Version: 1.0\r\n";

    $header .= "Content-type: text/html\r\n";

    $retval = mail ($to,$subject,$message,$header);

    if( $retval == true ) {

       echo "Message sent successfully...";

    } else {

       echo "Message could not be sent...";

    }

?>
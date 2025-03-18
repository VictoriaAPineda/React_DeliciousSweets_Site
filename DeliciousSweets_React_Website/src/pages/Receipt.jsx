/* 
*  [?] Cart should be cleared upon completion/submit. For now cart will be cleared on leaving
* receipt view due to not yet creating a personal user object acct to pull up the order from database. The order is save to a database
*/
import React from "react";
import {Page, Text, View, Document, StyleSheet} from '@react-pdf/renderer';
import { PDFViewer } from "@react-pdf/renderer";


// Styling the PDF Display
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
      },
      section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
      }
  });

const fetchedPurchaseData = JSON.parse(localStorage.getItem('cartItems'));
console.log(fetchedPurchaseData)
//   const {itemId,itemQuantity } = fetchedPurchaseData

// TODO: Display the order for printout
const MyDocument = () => (

<Document>
    <Page size="A4" style={styles.page}>
    <View style={styles.section}>
        <Text>Section #1</Text>
    </View>
    <View style={styles.section}>
        <Text>Section #2</Text>
    </View>
    </Page>
</Document>
);


function Receipt (){
    return(
        <>
            <section id="receipt-container">

         
                <p>Success!</p>
                <p>Here's your receipt!</p>
          
                <PDFViewer width="80%" height="700">
                    <MyDocument />
                </PDFViewer>
            
            </section>
        
        </>
    )
}
export default Receipt;
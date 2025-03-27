/* 
*  [?] Cart should be cleared upon completion/submit. For now cart will be cleared on leaving
* receipt view due to not yet creating a personal user object acct to pull up the order from database. The order is save to a database
*/
import React, { useContext, useEffect } from "react";
import {Page, Text, View, Document, StyleSheet} from '@react-pdf/renderer';
import { PDFViewer } from "@react-pdf/renderer";


// Styling the PDF Display
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#E4E4E4',
      },
      table:{
        width: '80%',
        // alignSelf: 'center',
        justifyContent: 'center',
        margin: 'auto',
        textAlign:'center'
      },
      header:{
        // borderTop: 'none'
      },
      row:{
        display:'flex',
        flexDirection:'row',
        borderTop:'1px solid black',
        paddingTop:8,
        paddingBottom: 8,
        fontSize: 10
      }, 
      borderBtm:{
        borderBottom: '1px solid black'
      },
      noborderTop:{
        borderTop: 'none'
      },
      col1:{
        width: '25%',
      },
      col2:{
        width: '25%',
      },
      col3:{
        width: '25%',
      },
      col4:{
        width: '25%',
      },
      bold: {
        fontWeight: 'bold'
      }, 
      alignRight:{
        textAlign: 'right'
      }, 
      padright:{
        paddingRight: 40
      }
  });

const userCartOrder = JSON.parse(localStorage.getItem('UserCart'));
const userCartOrderTotal = JSON.parse(localStorage.getItem('CartTotal'));
const userCartSubtotal = JSON.parse(localStorage.getItem('CartSubtotal'));
const deliveryFee =  JSON.parse(localStorage.getItem('Shipping'));
const tax =  JSON.parse(localStorage.getItem('CartTax'));

// TODO: Once user leaves page, the localstorage will be wiped.
// Order info will remain on database

/* TODO: Form
*   [1] - List contact info 
*   [2] - pickup/delivery info
*   [3] - last 4 digits of card
*/  

const MyDocument = () => {
    // TODO: Work on styling / aligning
    return(
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Table */}
                <View style={styles.table}>
                    {/* Headers */}
                    <View style={[styles.row, styles.bold, styles.header]}>
                        <Text style={styles.col1}>Item Name</Text>
                        <Text style={styles.col2}>Quantity</Text>
                        <Text style={styles.col3}>Price Per Unit</Text>
                        <Text style={styles.col4}>Total</Text>
                    </View>
                    {/* Data Rows of Orders */}
                    {userCartOrder.map((row, index) => (
                    <View key={index} style={styles.row} wrap={false}>
                            <Text style={styles.col1}>{row.name}</Text>
                            <Text style={styles.col2}>{row.itemQuantity}</Text>
                            <Text style={styles.col2}>${row.price}</Text>
                            <Text style={styles.col3}>${(row.itemQuantity * row.price).toFixed(2)}</Text>
                    </View>
                    ))}
                    {/* Summation */}
                    <View>
                    <Text style={[styles.row, styles.alignRight, styles.padright]}>Subtotal: ${userCartSubtotal}</Text>
                      <Text style={[styles.row, styles.alignRight, styles.padright, styles.noborderTop]}>Tax: ${tax}</Text>
                      <Text style={[styles.row, styles.alignRight, styles.padright, styles.noborderTop]}>Shipping: ${deliveryFee.toFixed(2)}</Text>
                     
                    </View>
                    <View>
                      <Text style={[styles.row, styles.bold, styles.alignRight, styles.padright, styles.borderBtm]}>Overall Total: ${userCartOrderTotal} </Text>
                    </View>
                </View>
            </Page>
        </Document>
        );
}
function Receipt ({onClose}){
    return(
        <>
            <section id="receipt-container" className="full-view-popup">
                <p>Success!</p>
                <p>Here's your receipt!</p>
          
                <PDFViewer width="80%" height="700">
                    <MyDocument/>
                </PDFViewer>
                <button onClick={onClose}>Close</button>
            </section>
        </>
    )
}
export default Receipt;
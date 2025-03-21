/* 
*  [?] Cart should be cleared upon completion/submit. For now cart will be cleared on leaving
* receipt view due to not yet creating a personal user object acct to pull up the order from database. The order is save to a database
*/
import React from "react";
import {Page, Text, View, Document, StyleSheet} from '@react-pdf/renderer';
import { PDFViewer } from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";


// Styling the PDF Display
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#E4E4E4',
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center'
      },
    //   section: {
    //     margin: 10,
    //     padding: 10,
    //     flexGrow: 1
    //   }, 

      table:{
        width: '80%',
        // alignSelf: 'center',
        justifyContent: 'center',
        margin: 'auto',
        textAlign:'center'
      },
      header:{
        borderTop: 'none'
      },
      row:{
        display:'flex',
        flexDirection:'row',
        borderTop:'1px solid black',
        paddingTop:8,
        paddingBottom: 8,
        fontSize: 10
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
        textAlign: 'left'
      }
  });

// TODO: Work on styling / aligning
const MyDocument = ({cart, total}) => {

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
                    {cart.map((row, index) => (
                    <View key={index} style={styles.row} wrap={false}>
                            <Text style={styles.col1}>{row.name}</Text>
                            <Text style={styles.col2}>{row.itemQuantity}</Text>
                            <Text style={styles.col2}>{row.price}</Text>
                            <Text style={styles.col3}>{row.itemQuantity * row.price}</Text>
                    </View>
                    ))}
                    {/* Summation */}
                    <View>
                      <Text style={[styles.row, styles.bold, styles.alignRight]}>Overall Total: {total}</Text>

                    </View>
                </View>
            </Page>
        </Document>
        );
}
function Receipt (){

  const {state} = useLocation()

  const cartData = state.cart // cartItemMergedData (UserCart.jsx)
  const cartTotal = state.total; // calcTotalCost() (UserCart.jsx)

  
    return(
        <>
            <section id="receipt-container">
                <p>Success!</p>
                <p>Here's your receipt!</p>
          
                <PDFViewer width="80%" height="700">
                    <MyDocument cart = {cartData} total = {cartTotal}/>
                </PDFViewer>
            </section>
        </>
    )
}
export default Receipt;
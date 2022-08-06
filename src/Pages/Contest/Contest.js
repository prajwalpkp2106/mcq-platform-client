import React, { useEffect, useState } from "react";
import { Card, Button } from "antd";
import { getContest } from "../../api/Requests";
import Loader from "../../Components/Loader/Loader";
import { connect } from "react-redux";
 const Data =[
  {
    name:"first"
  }
 ]
const Contest=()=> {
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    // useEffect(()=>{
    //     setLoading(true);
    //     getContest()
    //     .then((res)=>{
    //         setData(res);
    //         setLoading(false);
    //     })
    //     .catch((error)=>{})

    // },[]);

    
  return (
    <>
     {loading ? (
        <div>
          <Loader></Loader>
        </div>
      ) : (
        <>
        {
            Data.map((contest)=>{
                return(
                    <Card
                    style={{
                      margin: "30px",
                      marginTop: "20px",
                      border: "1px solid black",
                      padding: "5px 5px",
                    }}
                  >
                    Inner Card content
                    <Button type="primary" style={{ float: "right" }}>
                      Primary Button
                    </Button>
                  </Card>
                
                )
            })
        }
       
  
       
   </> 
     )
    }
    </>
  )

}

function mapStateToProps (state){
    return {
        isAuthenticated:state.isAuthenticated,
    }
}

export default connect(mapStateToProps)(Contest);
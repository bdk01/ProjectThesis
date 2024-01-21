
import {  useEffect, useState } from "react";
import axios from "../../axios"
import { useSelector } from "react-redux";
import { CardInform } from "../../components/CardInform/CartInform";
import { Grid, Paper, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";




function ReviewTA() {
     const { auth } = useSelector(state => state)
     const [data, setData] = useState([]);
     const [loading, setLoading] = useState(false);
     const { t } = useTranslation();
    /*  const fetchData = async (params = {}) => {
          setLoading(true);
        
          try {
               const { data: response } = await axios.get(`/api/getAllTa`, {
                    params
               }, {
                    headers: { Authorization: auth.accesstoken }
               });
               console.log(response)
            
               setData(response.taSchedules);
               console.log(data)
             
               setLoading(false);
               setPagination({
                    pageSize: params.pageSize,
                    current: params.page + 1,
                    total: response.length,
               });
          } catch (error) {
               console.error(error.message);
          }
     }; */
     useEffect(() => {

         const fetch = async()=>{
          try{

               const { data: response } = await axios.get(`/api/getAllTa`,  {
                    headers: { Authorization: auth.accesstoken }
               });
               console.log(response.taSchedules)
               /*    console.log(data) */
               setData(response.taSchedules);
          }
          catch(err){
               console.log(err)
          }
        
         }
         fetch()

     }, []);

     return (
          <div className=" mt-2 overflow-x-auto">
            <Text fw={700}  className="text-[30px]">{t('reviewTa')}</Text>
         <Paper withBorder shadow="md" mt={15} radius="md" className=""  >
                <Grid columns={12} gutter="xl" className="my-2 mx-3">
               {
                    data?.map((user,index)=>
                                (  

                                                <Grid.Col span={2} sm={6} md={3}  key={index}>
                                                  <CardInform user={user} />
                                                  </Grid.Col>

                                )

                    )
               }
                    
           

                </Grid>
            </Paper>
         
          </div>
     );
}

export default ReviewTA;
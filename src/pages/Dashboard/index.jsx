import { Chart } from "react-google-charts";
import Layout from '../../layouts/index';


const Dashboard=()=>{




    return(
        
            <Layout>

           
                    <div className="col-llg-6 col-md-6 col-sm-12 col-12">
                    <Chart
  width={'100%'}
  height={'300px'}
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={[
    ['Task', 'Hours per Day'],
    ['Work', 15],
    ['Eat', 15],
    ['Commute', 15],
    ['Watch TV', 15],
    ['Sleep', 15],
  ]}
  options={{
    title: 'My Daily Activities',
  }}
  rootProps={{ 'data-testid': '1' }}
/>
                    </div>
                    <div className="col-llg-6 col-md-6 col-sm-12 col-12"></div>
               

            <h1 className="h3 mb-4 text-gray-800">Blank Page</h1>

            </Layout>
        
    )
}

export default Dashboard;
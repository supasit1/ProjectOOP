import csvFilePath from './sample_submission.csv';
import { useState } from 'react';
import { CsvToHtmlTable } from 'react-csv-to-table';
import './App.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Bar Chart',
    },
  },
};

const labels = ['study','negative','none','image','1','0','0','1','1'];
function App() {
  const [ text, setText ] = useState();
  const [ t, sett ] = useState();
  const [ gph, setGraph] = useState();
  var [ nev, setNev] = useState();
  var [ study, setStudy] = useState();
  var [ none, setNone] = useState();
  var [ image, setImage] = useState();

  var [ firstone, setFirstone] = useState();

  var [ firstzero, setFirstzero] = useState();
  var [ secondzero, setSecondzero] = useState();

  var [ secondone, setSecondone] = useState();
  var [ thirdone, setThirdone] = useState();
  var countfirstone=0;
  var countfirstzero=0;
  var countsecondzero=0;
  var countsecondone=0;
  var countthirdone=0;
  var t1;
  var t2;
  var i=0;
 const show = async function(){
       await fetch( csvFilePath )
          .then( response => response.text() )
          .then( responseJson => {
              setText( responseJson );
          });
          t1=text.replace(/_/g,",")
          t2=t1.replace(/ /g,",")
          sett(t2)
          const t3 = t2.split(",");
          const Negative = t3.filter((item) => item === "negative");
          setNev(Negative.length)
          console.log("Negative="+Negative.length);
      
          const none = t3.filter((item) => item === "none");
          setNone(none.length);
          console.log("none="+none.length);
    
          const study = t3.filter((item) => item === "study");
          setStudy(study.length);
          console.log("study="+study.length)
      
          const image = t3.filter((item) => item === "image");
          setImage(image.length);
          console.log("image="+image.length)

          //first 1
          for( i=4;i < t3.length;i=i+7){
            countfirstone++
            setFirstone(countfirstone);
            //console.log(t3[i]);
          }
          //first 0
          for(i=5;i < t3.length;i=i+7){
            countfirstzero++
            setFirstzero(countfirstzero);
            //console.log(t3[i]);
          }
          //second 0
          for(i=6;i < t3.length;i=i+7){
            countsecondzero++
            setSecondzero(countsecondzero);
            //console.log(t3[i]);
          }
          //seccond 1
          for(i=7;i < t3.length;i=i+7){
            countsecondone++
            setSecondone(countsecondone);
            //console.log(t3[i]);
          }
          //third 1
          for(i=8;i < t3.length;i=i+7){
            countthirdone++
            setThirdone(countthirdone);
            //console.log(t3[i]);
          }
};




const data = {
  labels,
  datasets: [
    {
      label:"",
      data: [study,nev,none,image,firstone,firstzero,secondzero,secondone,thirdone],
      backgroundColor: ['rgba(255, 99, 132, 0.5)','rgba(0, 255, 255, 0.5)',
      'rgba(255, 0, 0, 0.5)','rgba(255,69,0, 0.5)','rgba(139,0,139, 0.5)',
      'rgba(255,20,147, 0.5)','rgba(139,69,19, 0.5)','rgba(0,255,0, 0.5)',
      'rgba(0,0,0, 0.5)'
    ],
    },
  ],
  
};


    const graph = function(){
     
      setGraph( <Bar options={options} data={data} />);
    }   
    return (
        <div className='content' align='center'>
            <h1>Graph</h1>
            <button onClick={ show } className='bt'>Show CSV</button>
            <button onClick={ graph } className='bg'>Show Graph</button>
            <pre>{gph}</pre>
            <h1>Table</h1>
            <CsvToHtmlTable 
              data={t}
              csvDelimiter={","}
            />
        </div>
    );
}

export default App;

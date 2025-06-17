import logo from './logo.svg';
import './App.css';
import './assets/utilizare_vars.css';
import './assets/utilizare_layout.css';
import { Layout } from 'antd';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BASE_NAME, BASE_ROUTE, CSRF_TOKEN, PRODMODE } from './config/config';
import AppMenuUt from './components/template_ut/appmenu_ut/AppMenuUt';
import { DS_USER } from './config/DEFAULTSTATE';
import { useEffect, useState } from 'react';
import MainPageUt from './modules/MAIN_PAGE_UT/MainPageUt';
import { PROD_AXIOS_INSTANCE } from './API/API';
import TableDataPageUt from './modules/DATABASE_UT/TABLE_DATA_UT/TableDataPageUt';
import TableListPageUt from './modules/DATABASE_UT/TABLE_LIST_UT/TableListPageUt';



function App() {
  const [userAct, setUserAct] = useState(!PRODMODE ? DS_USER : []);
  const [pageLoaded, setPageLoaded] = useState(true);

      useEffect(() => {
        PRODMODE && get_userdata(setUserAct)
    }, []);

  /** ------------------ FETCHES ---------------- */
    /**
     * Получение списка отделов
     * @param {*} req 
     * @param {*} res 
     */
    const get_userdata = async (req, res) => {
      try {
          // setLoadingOrgs(true)
          const format_data = {
              CSRF_TOKEN,
              data: {
                  // ...filters,
                  // created_date: get_unix_by_datearray(filters.created_date),
                  // active_date: get_unix_by_datearray(filters.active_date)
              }
          }
          let response = await PROD_AXIOS_INSTANCE.get('/usda?_token=' + CSRF_TOKEN);
          console.log('me: ', response);
          setUserAct(response.data);
      } catch (e) {
          console.log(e)
      } finally {
          // setLoadingOrgs(false)
          setPageLoaded(true);
      }
  }
  /** ------------------ FETCHES END ---------------- */


  return (
    <Layout>
      <BrowserRouter basename={BASE_NAME}>
        <div>
          <AppMenuUt/>
          
            <Routes>
            <Route path={'/'} element={<MainPageUt userdata={userAct}/>} />
            <Route path={BASE_ROUTE + '/'} element={<MainPageUt userdata={userAct}/>}  />

            <Route path={'/db/tables'} element={<TableListPageUt userdata={userAct}/>} />
            <Route path={BASE_ROUTE + '/db/tables'} element={<TableListPageUt userdata={userAct}/>}  />
         
            <Route path={'/db/tables/:tableName'} element={<TableDataPageUt userdata={userAct}/>} />
            <Route path={BASE_ROUTE + '/db/tables/:tableName'} element={<TableDataPageUt userdata={userAct}/>}  />
            </Routes>



        </div>




      </BrowserRouter>

    </Layout>
  );
}

export default App;

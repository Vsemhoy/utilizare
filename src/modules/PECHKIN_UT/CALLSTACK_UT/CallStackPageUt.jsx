import React, { useEffect, useState, useCallback, useMemo, useId } from 'react';
import { PROD_AXIOS_INSTANCE } from '../../../API/API';
import {CSRF_TOKEN, HTTP_HOST, PRODMODE} from '../../../config/config';
import {data, Navigate, useLocation, useNavigate} from 'react-router-dom';
// import { TABLE_LIST_MOCK } from './components/mock/TABLELISTMOCK';
import { Button, Input, Select } from 'antd';
// import TableListCardUt from './components/TableListCardUt';
import { FileAddFilled, StarFilled } from '@ant-design/icons';
import "./components/style/callstackpage.css";
import CallStackCard from './components/CallStackCard';
import { CALL_DATA, CALL_DEFAULT_POST } from './components/MOCKSTACK';

  const sortOptions = [
    { value: 'name$asc', label: 'Name (A-Z)' },
    { value: 'name$desc', label: 'Name (Z-A)' },
    { value: 'sort_order$asc', label: 'Sort Order (↑)' },
    { value: 'sort_order$desc', label: 'Sort Order (↓)' },
    { value: 'published_dev$asc', label: 'Dev Published (Yes → No)' },
    { value: 'published_dev$desc', label: 'Dev Published (No → Yes)' },
    { value: 'published_prod$asc', label: 'Prod Published (Yes → No)' },
    { value: 'published_prod$desc', label: 'Prod Published (No → Yes)' },
    { value: 'has_migrations$asc', label: 'Has migrations (Yes → No)' },
    { value: 'has_migrations$desc', label:  'Has migrations (No → Yes)' },
    { value: 'updated_at$asc', label: 'Update Date (Old → New)' },
    { value: 'updated_at$desc', label: 'Update Date (New → Old)' },
    { value: 'starred$asc', label: 'Starred (Yes → No)' },
    { value: 'starred$desc', label: 'Starred (No → Yes)' },
    { value: 'color$asc', label: 'By color' },
  ];

const  generateRandomId = (length = 8) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}


// Оптимизированный Input компонент
const OptimizedInput = React.memo(({ value, onChange, placeholder }) => {
  return (
    <Input 
      allowClear
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
});


const CallStackPageUt = (props) => {
    const [baseCallList, setBaseCallList] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const [setselectedSort, setSetselectedSort] = useState('name_asc');
    const [filterText, setFilterText] = useState('');
    const [filterName, setFilterName] = useState('');
    const [baseData, setBaseData] = useState(null);

    const [sortConfig, setSortConfig] = useState({
        key: 'name',
        direction: 'asc'
    });
    const [sortedCallList, setSortedCallList] = useState([]);

    const [autoCalled, setAutoCalled] = useState([]);


    useEffect(() => {
        console.log('baseCallList', baseCallList)
      setSortedCallList(baseCallList);
    }, [baseCallList]);

    useEffect(() => {

        if (PRODMODE){
            get_calls();
        } else {
            setBaseCallList([CALL_DATA]);
        }
    }, []);


     /** ------------------ FETCHES ---------------- */
    
            const get_calls = async (req, res) => {
              try {
                  let response = await PROD_AXIOS_INSTANCE.get('/api/utilizare/postal/getrequests?_token=' + CSRF_TOKEN);
                  console.log('LOADED: ', response.data);
                  // setUserAct(response.data);
                  setBaseCallList(response.data.content);
              } catch (e) {
                  console.log(e)
              } finally {
              }
          }


            const create_request = async (req, res) => {
                const nexItem = JSON.parse(JSON.stringify(CALL_DATA));
                nexItem.name = "New Call " + generateRandomId();
                nexItem.link = "{{HOST}}/usda?_token={{TOKEN}}";
                nexItem.request_body = JSON.stringify(CALL_DEFAULT_POST);
                nexItem.sort_order = baseCallList.length + 1;
                nexItem.method = 1;
              try {
                  let response = await PROD_AXIOS_INSTANCE.post('/api/utilizare/postal/createrequest', {
                    data: nexItem,
                    _token: CSRF_TOKEN
                  });
                  console.log('LOADED: ', response.data);
                  // setUserAct(response.data);
                //   setBaseCallList(response.data.content);
                get_calls();
              } catch (e) {
                  console.log(e)
              } finally {
              }
          }

            // const call_post = async (url, data) => {
            //     try {
            //         let response = await PROD_AXIOS_INSTANCE.post(url, data);
            //         handleServerResponseNorm(response);
            //         setActiveTab('response');
            //         if (response){
            //             console.log('response', response)
            //         }
            //     } catch (e) {
            //         console.log('Ошибка:', e);
            //         if (e.response && e.response.data) {
            //             handleServerResponse(e.response.data, e.response.headers);
            //         } else {
            //             setResponse('Ошибка соединения или сервер не отвечает');
            //             setResponseType('text');
            //             setActiveTab('response');
            //         }
            //     } finally {
            //         // setLoadingOrgs(false)
            //     }
            // }

          /** ------------------ FETCHES END ---------------- */


    const handleSortChange = () => {

    }


    const handleChangeName = () => {
        
    }

    const handleChangeText = () => {
        
    }

    const handleAddCall = () => {
        if (PRODMODE){
            create_request();
        } else {
            const newCall = JSON.parse(JSON.stringify(CALL_DATA)) ;
            newCall.id = baseCallList.length;
            setBaseCallList((prevState)=>[newCall, ...prevState]);

        }
    }

    const setReplacers = (obj) => {
        if (obj && obj._token && obj._token == "{{TOKEN}}"){
            obj._token = CSRF_TOKEN
        }
        return obj;
    }
    const setReplacerHostAddress = (text) => {
        return text.replace("{{HOST}}", HTTP_HOST).replace("{{TOKEN}}", CSRF_TOKEN);

    }

    const call_post = async (url, data) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post(url, data);
            // handleServerResponseNorm(response);
            // setActiveTab('response');
            if (response){
                console.log('response', response)
            }
        } catch (e) {
            console.log('Ошибка:', e);
            if (e.response && e.response.data) {
                // handleServerResponse(e.response.data, e.response.headers);
            } else {
                // setResponse('Ошибка соединения или сервер не отвечает');
                // setResponseType('text');
                // setActiveTab('response');
            }
        } finally {
            // setLoadingOrgs(false)
        }
    }

    const call_get = async (url) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.get(url);
            // handleServerResponseNorm(response);
            // setActiveTab('response');
            if (response){
                console.log('response', response)
            }
        } catch (e) {
            console.log('Ошибка:', e);
            if (e.response && e.response.data) {
                // handleServerResponseNorm(e.response.data, e.response.headers);
            } else {
                // setResponse('Ошибка соединения или сервер не отвечает');
                // setResponseType('text');
                // setActiveTab('response');
            }
        } finally {
            // setLoadingOrgs(false)
        }
    }

    const call_put = async (url, data) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.put(url, data);
            // handleServerResponseNorm(response);
            // setActiveTab('response');
            if (response){
                console.log('response', response)
            }
        } catch (e) {
            console.log('Ошибка:', e);
            if (e.response && e.response.data) {
                // handleServerResponse(e.response.data, e.response.headers);
            } else {
                // setResponse('Ошибка соединения или сервер не отвечает');
                // setResponseType('text');
                // setActiveTab('response');
            }
        } finally {
            // setLoadingOrgs(false)
        }
    }

    const get_call = async (itemId) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/utilizare/postal/getitem',
                {
                    data: {
                        id: itemId
                    },
                    _token: CSRF_TOKEN
                }
            );

            console.log('LOADED: ', response.data);
            // setUserAct(response.data);
            // let obj = response.data.content;
            // obj.request_body = JSON.parse(obj.request_body);
            setBaseData(response.data.content);

            let calldata = JSON.parse(JSON.stringify(response.data.content.request_body));
            calldata = setReplacers(calldata)
            let url = setReplacerHostAddress(response.data.content.link);

            console.log(response.data.content.method);
            switch (response.data.content.method){
                case 1:
                    await call_get(url);
                    break;
                case 2:
                    await call_post(url, calldata);
                    break;
                case 3:
                    await call_put(url, calldata);
                    break;
            }


            console.log(response.data.content);
        } catch (e) {
            console.log(e)
        } finally {
        }
    }


    const handelStartCall = (id) => {
        console.log(id);
        get_call(id)
    }

    const handleCallAutoCall = (state, id, method, link, body) => {
        if (state == true){
            let obj = { id: id, method: method, link: link, body: body};
            setAutoCalled((prevState)=>[...prevState, obj]);
        } else {
            setAutoCalled((prevState)=>prevState.filter((item)=>item.id !== id));
        }
    }

    const handleStopAll = ()=>{
        setAutoCalled([]);
    }
    const handleAutoCallAll = ()=>{
    const calls = sortedCallList
        .filter(item => item.is_cron) // Оставляем только нужные объекты
        .map(item => ({
            id: item.id,
            method: item.method,
            link: item.link,
            body: item.body
        }));

        console.log('calls', calls);
        setAutoCalled(calls);
    }

    const handleDblClick = (id) => {
       navigate(`/postal/callstack/${id}`);
    }

  return (
    <div className={'ut-page-container'}>
      <div className={'ut-mw-1200'}
      >
        <div className={'ut-content-page'}
        style={{ minHeight:'calc(100vh - 100px)'}}
        
        >
        <div style={{padding: '12px'}} className={'ut-flex-space'}>
            <div>
            {autoCalled.length > 0 ? (
                <Button 
                    onClick={handleStopAll}
                type="primary" danger>
                    STOP ALL
                </Button>
            ): (
                <Button
                    onClick={handleAutoCallAll}
                 danger>RUN ALL</Button>
            )}

            </div>
            <div>
                <Button
                 onClick={handleAddCall}
                 icon={<FileAddFilled />}>Create</Button>
            </div>
        </div>

        <div style={{padding: '12px', background: '#1b1b1bc8'}} className={'ut-flex-space'}>
          <div>
          <OptimizedInput  
            value={filterName}
            onChange={handleChangeName}
            placeholder="Filter by name"
          />
          </div>
          <div>
          <OptimizedInput
           
            value={filterText}
            onChange={handleChangeText}
            placeholder="Filter by text"
          />
          </div>
          <div>
              <Select
                defaultValue="name_asc"
                style={{ width: '100%', minWidth: '200px' }}
                onChange={handleSortChange}
                options={sortOptions}
              />
          </div>
        </div>

          <div className={'ut-table-list-stack'}>
          <div className={'ut-call-stack-card'}>
            <div>
              <div>
                num
              </div>
            </div>
            <div>
              <div>
                METH
              </div>
            </div>
              <div>
              <div>
                NAME
              </div>
            </div>
            <div>
              <div>
                LINK
              </div>
            </div>
            <div>
              <div>
                DESCR
              </div>
            </div>
            <div>
              <div>
                TAGS
              </div>
            </div>
              <div>
              <div>
                CRON
              </div>
            </div>
            <div>
              <div>
                CALL
              </div>
            </div>
              <div>
              <div>
                AUTO
              </div>
            </div>
              <div>
              <div>
                <StarFilled />
              </div>
            </div>
              <div>
              <div>
                
              </div>
            </div>

          </div>
            {sortedCallList?.map((tabitem, index)=>(
              <CallStackCard
              data={tabitem} 
              index={index} 
              key={tabitem.id}
              on_click_autocall={handleCallAutoCall}
              auto_call={autoCalled.find((item)=> item.id === tabitem.id) != null}
              on_double_click={handleDblClick}
              handelStartCall={handelStartCall}
                // onCheckCell={handleCheckCell}
                // on_save_color={handleChangeColor}
                // on_save_descr={handleChangeDescr}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default CallStackPageUt;
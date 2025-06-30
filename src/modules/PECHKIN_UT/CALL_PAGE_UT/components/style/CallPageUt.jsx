import { FileFilled, PlayCircleOutlined } from '@ant-design/icons';
import { Button, Checkbox, Input, Radio, Select, Switch } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { githubDarkTheme, JsonEditor } from 'json-edit-react';
import React, { useEffect, useState } from 'react';
import { CALL_DATA, CALL_DEFAULT_POST, GROUPS_CALL_ITEMS } from '../../../CALLSTACK_UT/components/MOCKSTACK';
import { PROD_AXIOS_INSTANCE } from '../../../../../API/API';
import { CSRF_TOKEN, HTTP_HOST, PRODMODE } from '../../../../../config/config';
import { Link, useParams } from 'react-router-dom';



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






const CallPageUt = (props) => {

const [response, setResponse] = useState(null);
const [responseType, setResponseType] = useState(null); // 'json', 'html', 'text'

  const {call_id} = useParams();
  const [activeTab, setActiveTab] = useState('body');

    const [itemId, setItemId] = useState(call_id);
    const [method, setMethod] = useState(1);
    const [name, setName] = useState('initialValue');
    const [link, setLink] = useState('http://192.168.1.16/hello');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [isCron, setIsCron] = useState(false);
    const [starred, setStarred] = useState(false);
    const [sortOrder, setSortOrder] = useState(1);

    const [cronInterval, setCronInterval] = useState(0);
    const [cronMinutes, setCronMinutes] = useState("");
    const [autoRun, setAutoRun] = useState(false);
    const [userId, setUserId] = useState(null);
    const [groupId, setGroupId] = useState(0);

    const [baseData, setBaseData] = useState(null);

    const [loaded, setLoaded] = useState(false);
    
  useEffect(() => {
    if (PRODMODE){
      get_call();
    } else {
      setBaseData(CALL_DATA);
    }
  }, [itemId]);


  const saveData = () => {
    if (loaded){
      let obj = {
        id: itemId,
        name: name,
        link: link,
        method: method,
        description: description,
        tags: tags,
        is_cron: isCron,
        starred: starred,
        request_body: JSON.stringify(requestBody),
        sort_order:  sortOrder,
        cron_interval: cronInterval,
        cron_minutes: cronMinutes,
        auto_run: autoRun,
        group_id: groupId,
      };

      update_call(obj);
    }
  }


useEffect(() => {
  if (response && activeTab === 'response') {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }
}, [response, activeTab]);

  useEffect(() => {
    saveData();
  }, [method, autoRun, isCron, groupId, starred]);

  useEffect(() => {
    console.log('baseData', baseData)
    if (baseData){
      setMethod(baseData?.method);
      setName(baseData.name);
      setLink(baseData.link);
      setDescription(baseData.description);
      setTags(baseData.tags);
      setRequestBody(baseData.request_body);
      setAutoRun(baseData.auto_run);
      setCronInterval(baseData.cron_interval);
      setCronMinutes(baseData.cron_minutes);
      setSortOrder(baseData.sort_order);
      setStarred(baseData.starred);
      setGroupId(baseData.group_id);

      setTimeout(() => {
        setLoaded(true);
      }, 5000);
    }
  }, [baseData]);

//   useEffect(() => {
//   if (response && activeTab === 'response') {
//     window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
//   }
// }, [response, activeTab]);

  const [requestBody, setRequestBody] = useState( JSON.parse(JSON.stringify(CALL_DEFAULT_POST)));

  const handleSetTab = (name) => {
    setActiveTab(name);
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


const handleServerResponseNorm = (response) => {
  const contentType = response.headers['content-type'] || '';

  let type = 'text';
  let data = response.data;

  if (contentType.includes('application/json')) {
    type = 'json';
    try {
      data = JSON.parse(JSON.stringify(data)); // нормализуем
    } catch (e) {
      data = data;
    }
  } else if (contentType.includes('text/html')) {
    type = 'html';
  }

  setResponse(data);
  setResponseType(type);
};

const handleServerResponse = (responseData, headers) => {
  const contentType = headers['content-type'] || '';

  if (contentType.includes('application/json')) {
    setResponseType('json');
    try {
      setResponse(JSON.parse(responseData));
    } catch (e) {
      setResponse(responseData); // fallback
    }
  } else if (contentType.includes('text/html') || responseData.trim().startsWith('<!doctype html>')) {
    setResponseType('html');
    setResponse(responseData);
  } else {
    setResponseType('text');
    setResponse(responseData);
  }

  setActiveTab('response'); // автоматически переключаем на вкладку Response
};


  /** ------------------ FETCHES ---------------- */

  const get_call = async (req, res) => {
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
        let obj = response.data.content;
        obj.request_body = JSON.parse(obj.request_body);
        setBaseData(response.data.content);
    } catch (e) {
        console.log(e)
    } finally {
    }
}

  const update_call = async (data, req, res) => {
    try {
        let response = await PROD_AXIOS_INSTANCE.post('/api/utilizare/postal/updaterequest',
          {
            data: data,
            _token: CSRF_TOKEN
          }
        );
        console.log('LOADED: ', response.data);
        // setUserAct(response.data);

    } catch (e) {
        console.log(e)
    } finally {
    }
  }

    const delete_call = async (req, res) => {
    try {
        let response = await PROD_AXIOS_INSTANCE.post('/api/utilizare/postal/deleterequest',
          {
            data: {
              id: itemId
            },
            _token: CSRF_TOKEN
          }
        );
        console.log('LOADED: ', response.data);
        // setUserAct(response.data);
        let obj = response.data.content;
        obj.request_body = JSON.parse(obj.request_body);
        setBaseData(response.data.content);
    } catch (e) {
        console.log(e)
    } finally {
    }
  }


  const call_post = async (url, data) => {
    try {
        let response = await PROD_AXIOS_INSTANCE.post(url, data);
        handleServerResponseNorm(response);
        setActiveTab('response');
            if (response){
              console.log('response', response)
            }
    } catch (e) {
        console.log('Ошибка:', e);
      if (e.response && e.response.data) {
        handleServerResponse(e.response.data, e.response.headers);
      } else {
        setResponse('Ошибка соединения или сервер не отвечает');
        setResponseType('text');
        setActiveTab('response');
      }
    } finally {
        // setLoadingOrgs(false)
    }
  }

  const call_get = async (url) => {
    try {
        let response = await PROD_AXIOS_INSTANCE.get(url);
        handleServerResponseNorm(response);
        setActiveTab('response');
            if (response){
              console.log('response', response)
            }
    } catch (e) {
        console.log('Ошибка:', e);
      if (e.response && e.response.data) {
        handleServerResponseNorm(e.response.data, e.response.headers);
      } else {
        setResponse('Ошибка соединения или сервер не отвечает');
        setResponseType('text');
        setActiveTab('response');
      }
    } finally {
        // setLoadingOrgs(false)
    }
  }

  const call_put = async (url, data) => {
    try {
        let response = await PROD_AXIOS_INSTANCE.put(url, data);
        handleServerResponseNorm(response);
        setActiveTab('response');
            if (response){
              console.log('response', response)
            }
    } catch (e) {
        console.log('Ошибка:', e);
    if (e.response && e.response.data) {
      handleServerResponse(e.response.data, e.response.headers);
    } else {
      setResponse('Ошибка соединения или сервер не отвечает');
      setResponseType('text');
      setActiveTab('response');
    }
    } finally {
        // setLoadingOrgs(false)
    }
  }


  /** ------------------ FETCHES END ---------------- */

  const handleCall = () => {
    
    let calldata = JSON.parse(JSON.stringify(requestBody));
    calldata = setReplacers(calldata)
    let url = setReplacerHostAddress(link);
    if (method == 1){

      call_get(url);
    } else if (method == 2){
      call_post(url, calldata);
    } else {
      call_put(url, calldata);

    }
  }

    useEffect(() => {
        saveData()
    }, [requestBody]);

  return (
    <div className={'ut-page-container'}>
      <div className={'ut-mw-1200'}
      >
        <div className={'ut-content-page'}
        style={{ minHeight:'calc(100vh - 100px)'}}
        
        >
        <div style={{padding: '12px', gridGap: '12px'}} className={'ut-flex-space'}>

                <div>
            <Link to={`/postal/callstack#${itemId}`} >Back</Link>
        </div>
            <div>
            
                <Select
                size={'large'}
                style={{width: '120px'}}
                  placeholder="Select a person"
                  optionFilterProp="children"
                  value={method}
                  onChange={setMethod}
                  // onSearch={onSearch}
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={[
                    {
                      key: 'dfklajd',
                      value: 1,
                      label: 'GET',
                    },
                    {
                      key: 'dfjaskd',
                      value: 2,
                      label: 'POST',
                    },
                    {
                      key: 'dfakjd',
                      value: 3,
                      label: 'PUT',
                    },
                  ]}
                />
            </div>
          <div style={{width: '100%'}} >
            <Input 
              onBlur={saveData}
            size={'large'}
             style={{width: '100%'}}
             value={name}
             placeholder={'Name'}
             maxLength={120}
                  onChange={(ev)=>{setName(ev.target.value)}}
             />
          </div>
           <div style={{width: '100%'}} >
            <Input 
            onBlur={saveData}
            size={'large'}
             style={{width: '100%'}}
             value={link}
             placeholder={'URL'}
             onChange={(ev)=>{setLink(ev.target.value)}}
             />
          </div>
          

            <div>
                <Button
                  onClick={handleCall}
                   size={'large'}
                  danger
                 icon={<PlayCircleOutlined />}>Call</Button>
            </div>
        </div>

        <div style={{padding: '12px', gridGap: '12px'}} className={'ut-flex-space'}>
           <div style={{width: '100%'}} >
            <TextArea 
            onBlur={saveData}
             style={{width: '100%'}}
             value={description}
             placeholder={'Description'}
             onChange={(ev)=>{setDescription(ev.target.value)}}
             />
          </div>
        </div>

        <div style={{padding: '12px', gridGap: '12px'}} className={'ut-flex-space'}>
           <div style={{width: '100%'}} >
              <Radio.Group defaultValue="body" size="large"
                value={activeTab}
                onChange={(ev)=>{setActiveTab(ev.target.value)}}
              >
                <Radio.Button value="body">Body</Radio.Button>
                <Radio.Button value="response">Response</Radio.Button>
              </Radio.Group>
          </div>
          <div>{call_id}</div>
        </div>

        {activeTab == 'body' ? (
          <div className={'ut-table-list-stack ut-pa-12 ut-col-3-1'} style={{ width: '100%' }}>
            <div>
            <JsonEditor
              style={{ width: '100%', minHeight: '300px' }}
              data={requestBody}                // <-- правильно: data, не date
              setData={setRequestBody}          // <-- функция обновления данных
              theme={githubDarkTheme}            // если используешь тему
              onBlur={saveData}
            />
            </div>
            <div className={'ut-side-panel'}>
                          <Checkbox 
                checked={isCron}
                onChange={(ev)=>{setIsCron(ev.target.checked)}}
               > Авто триггер</Checkbox>
              <br />
              <br />
            {isCron == true && (
              <>
              <Checkbox 
                  checked={autoRun}
                onChange={(ev)=>{setAutoRun(ev.target.checked)}}
              >  Запускать при входе в утиль</Checkbox>
              <br />
              <br />
              <label>Интервал запуска в минутах</label>
              <br /> 
              <br /> 
              <Input
              onBlur={saveData}
                value={cronInterval}
                onChange={(ev)=>{setCronInterval(ev.target.value)}}
                placeholder='интервал в минутах'
               type={'number'} min={'1'} ></Input>
              <br />
              <br />
              <label>Или запускать каждый час в N минут</label>
              <br /> 
              <br /> 
                <Input
                onBlur={saveData}
                  value={cronMinutes}
                  onChange={(ev)=>{setCronMinutes(ev.target.value)}}
                  placeholder='запускать в указанные минуты часа'
                  type={'text'} maxLength={100}></Input>
                <br /> 
            </>
            )}

              
              <br /> 
                <label>А как насчёт тегов?</label>
              <br /> 
              <br /> 
                <Input
                onBlur={saveData}
                                value={tags}
                onChange={(ev)=>{setTags(ev.target.value)}}
                  placeholder='просто текст'
                type={'text'} maxLength={64}></Input>
              <br /> 
              <br /> 
              <label>Позиция в куче</label>
              <br /> 
              <br /> 
                <Input
                onBlur={saveData}
                                value={sortOrder}
                onChange={(ev)=>{setSortOrder(ev.target.value)}}
                  type={'number'} min={'1'} max={'32000000'}
                  placeholder='Больше-выше'
                  ></Input>
              <br /> 
              <br /> 
              <label>Группа</label>
              <br /> 
              <br /> 
                <Select 
                  value={groupId}
                  onChange={(ev)=>{setGroupId(ev)}}
                  style={{width: '100%'}}
                  options={GROUPS_CALL_ITEMS.map((item)=>(
                    {key: item.id,
                    label: item.name,
                    value: item.id
                  }))}
                />
              <br /> 
              <br /> 
                   <Checkbox 
                  checked={starred}
                onChange={(ev)=>{setStarred(ev.target.checked)}}
              >  Звёздочка</Checkbox>
              <br />
              <br />
            </div>
            
          </div>
        ) : (
          <div className={'ut-table-list-stack ut-pa-12'} style={{ width: '100%' }}>
            {response ? (
              <>
                {responseType === 'json' && (
                  <JsonEditor
                    style={{ width: '100%', minHeight: '300px' }}
                    data={response}
                    theme={githubDarkTheme}
                    readOnly
                  />
                )}

                {responseType === 'html' && (
                    <iframe
                        title="laravel-response"
                        srcDoc={response}
                        style={{
                            width: '100%',
                            height: '1000px',
                            border: 'none',
                            background: '#1e1e1e',
                        }}
                    />

                )}

                  {responseType === 'text' && (
                      <pre
                          style={{
                              whiteSpace: 'pre-wrap',
                              wordWrap: 'break-word',
                      padding: '12px',
                      background: '#1e1e1e',
                      color: '#dcdcdc',
                      fontFamily: 'monospace',
                    }}
                  >
                    {JSON.stringify(response, null, 2)}
                  </pre>
                )}
              </>
            ) : (
              <div>Ответ ещё не получен</div>
            )}
          </div>
        )}


        </div>
      </div>
    </div>
  );
};

export default CallPageUt;
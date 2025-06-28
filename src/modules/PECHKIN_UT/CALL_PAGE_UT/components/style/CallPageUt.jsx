import { FileFilled, PlayCircleOutlined } from '@ant-design/icons';
import { Button, Checkbox, Input, Radio, Select, Switch } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { githubDarkTheme, JsonEditor } from 'json-edit-react';
import React, { useEffect, useState } from 'react';
import { CALL_DATA, CALL_DEFAULT_POST, GROUPS_CALL_ITEMS } from '../../../CALLSTACK_UT/components/MOCKSTACK';
import { PROD_AXIOS_INSTANCE } from '../../../../../API/API';
import { CSRF_TOKEN, HTTP_HOST, PRODMODE } from '../../../../../config/config';
import { useParams } from 'react-router-dom';


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

    const [autoCall, setAutoCall] = useState(false);
    const [cronInterval, setCronInterval] = useState(0);
    const [cronMinutes, setCronMinutes] = useState("");
    const [autoRun, setAutoRun] = useState(false);
    const [userId, setUserId] = useState(null);
    const [groupId, setGroupId] = useState(0);

    const [baseData, setBaseData] = useState(null);
    
  useEffect(() => {
    if (PRODMODE){

    } else {
      setBaseData(CALL_DATA);
    }
  }, [itemId]);


  useEffect(() => {
    console.log('baseData', baseData)
    if (baseData){
      setMethod(baseData?.method);
      setName(baseData.name);
      setLink(baseData.link);
      setDescription(baseData.description);
      setTags(baseData.tags);
      setRequestBody(baseData.request_body);
    }
  }, [baseData]);


  const [requestBody, setRequestBody] = useState( JSON.parse(JSON.stringify(CALL_DEFAULT_POST)));

  const handleSetTab = (name) => {
    setActiveTab(name);
  }

  const setReplacers = (obj) => {
    if (obj._token && obj._token == "{{TOKEN}}"){
      obj._token = CSRF_TOKEN
    }
    return obj;
  }
  const setReplacerHostAddress = (text) => {
    return text.replace("{{HOST}}", HTTP_HOST);
  }


  const call_post = async (url, data) => {
            try {
                let response = await PROD_AXIOS_INSTANCE.post(url, data);
                    if (response){
                      console.log('response', response)
                    }
            } catch (e) {
                console.log(e)
            } finally {
                // setLoadingOrgs(false)
            }
        }

  const handlePostCall = () => {
    let calldata = JSON.parse(JSON.stringify(CALL_DEFAULT_POST));
    calldata = setReplacers(calldata);
    let url = setReplacerHostAddress(link);

    call_post(url, calldata);
  }


  return (
    <div className={'ut-page-container'}>
      <div className={'ut-mw-1200'}
      >
        <div className={'ut-content-page'}
        style={{ minHeight:'calc(100vh - 100px)'}}
        
        >
        <div style={{padding: '12px', gridGap: '12px'}} className={'ut-flex-space'}>
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
            size={'large'}
             style={{width: '100%'}}
             value={link}
             placeholder={'URL'}
             onChange={(ev)=>{setLink(ev.target.value)}}
             />
          </div>
          

            <div>
                <Button
                  onClick={handlePostCall}
                   size={'large'}
                  danger
                 icon={<PlayCircleOutlined />}>Call</Button>
            </div>
        </div>

        <div style={{padding: '12px', gridGap: '12px'}} className={'ut-flex-space'}>
           <div style={{width: '100%'}} >
            <TextArea 
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
                  
            </div>
            
          </div>
        ) : (
          <div className={'ut-table-list-stack ut-pa-12'} style={{ width: '100%' }}>
            Сюда мы поместим респонс ответ от сервера
          </div>
        )}


        </div>
      </div>
    </div>
  );
};

export default CallPageUt;
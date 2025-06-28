import { FileFilled, PlayCircleOutlined } from '@ant-design/icons';
import { Button, Input, Radio, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { githubDarkTheme, JsonEditor } from 'json-edit-react';
import React, { useEffect, useState } from 'react';
import { CALL_DEFAULT_POST } from '../../../CALLSTACK_UT/components/MOCKSTACK';
import { PROD_AXIOS_INSTANCE } from '../../../../../API/API';
import { CSRF_TOKEN, HTTP_HOST } from '../../../../../config/config';


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
  const [activeTab, setActiveTab] = useState('body');

    const [itemId, setItemId] = useState(425);
    const [method, setMethod] = useState(1);
    const [name, setName] = useState('initialValue');
    const [link, setLink] = useState('http://192.168.1.16/hello');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [isCron, setIsCron] = useState(false);
    const [starred, setStarred] = useState(false);
    const [sortOrder, setSortOrder] = useState(1);

    const [autoCall, setAutoCall] = useState(false);

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
                  // onChange={onChange}
                  // onSearch={onSearch}
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={[
                    {
                      value: '1',
                      label: 'GET',
                    },
                    {
                      value: '2',
                      label: 'POST',
                    },
                    {
                      value: '3',
                      label: 'PUT',
                    },
                  ]}
                />
            </div>
          <div style={{width: '100%'}} >
            <Input 
            size={'large'}
             style={{width: '100%'}}
             value={"hello"}
             placeholder={'Name'}
             />
          </div>
           <div style={{width: '100%'}} >
            <Input 
            size={'large'}
             style={{width: '100%'}}
             value={"hello"}
             placeholder={'URL'}
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
             value={""}
             placeholder={'Description'}
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
        </div>

        {activeTab == 'body' ? (
          <div className={'ut-table-list-stack ut-pa-12'} style={{ width: '100%' }}>


            <JsonEditor
              style={{ width: '100%', minHeight: '300px' }}
              data={requestBody}                // <-- правильно: data, не date
              setData={setRequestBody}          // <-- функция обновления данных
              theme={githubDarkTheme}            // если используешь тему
            />
            
          </div>
        ) : (
          <div className={'ut-table-list-stack ut-pa-12'} style={{ width: '100%' }}>
            Helfalsdfkjas lkdjfkl
          </div>
        )}


        </div>
      </div>
    </div>
  );
};

export default CallPageUt;
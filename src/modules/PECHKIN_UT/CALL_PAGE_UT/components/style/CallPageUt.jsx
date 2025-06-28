import { FileFilled, PlayCircleOutlined } from '@ant-design/icons';
import { Button, Input, Radio, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { githubDarkTheme, JsonEditor } from 'json-edit-react';
import React, { useEffect, useState } from 'react';


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
  const [requestBody, setRequestBody] = useState({
"string": "Welcome to the Editor 😀",
  "number": 99,
  "boolean": true,
  "nothing": null,
  "enum": "Option B 🍌",
  "Usage": [
    "Edit a value by clicking the \"edit\" icon, or double-clicking the value.",
    "You can change the type of any value",
    "You can add new values to objects or arrays",
    "You can edit individual values, or even a whole object node at once (as JSON text)",
    "You can also drag and drop!",
    {
      "nested": "An object inside an array",
      "basic": false,
      "value": 6.66
    }
  ],
  "Keyboard interaction": {
    "\"Enter\" to submit change": "(or Ctrl/Cmd-Enter when editing whole JSON nodes)",
    "\"Escape\" to cancel": "👍",
    "To start a new line": "Shift/Ctrl/Cmd-Enter (or just \"Enter\" when editing JSON nodes)",
    "When copying to clipboard": "Hold down \"Ctrl/Cmd\" to copy path instead of data",
    "When opening/closing a node": "Hold down \"Alt/Option\" to open/close ALL child nodes at once",
    "Tab navigation": "Use \"Tab\" and \"Shift-Tab\" to quickly move between values."
  }
  });

  const handleSetTab = (name) => {
    setActiveTab(name);
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
             style={{width: '100%'}}
             value={"hello"}
             placeholder={'Name'}
             />
          </div>
           <div style={{width: '100%'}} >
            <Input 
             style={{width: '100%'}}
             value={"hello"}
             placeholder={'Name'}
             />
          </div>
          

            <div>
                <Button
         
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
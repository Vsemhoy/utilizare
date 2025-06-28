import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { PROD_AXIOS_INSTANCE } from '../../../API/API';
import { CSRF_TOKEN, PRODMODE } from '../../../config/config';
import { useLocation } from 'react-router-dom';
// import { TABLE_LIST_MOCK } from './components/mock/TABLELISTMOCK';
import { Button, Input, Select } from 'antd';
// import TableListCardUt from './components/TableListCardUt';
import { FileAddFilled, StarFilled } from '@ant-design/icons';
import "./components/style/callstackpage.css";
import CallStackCard from './components/CallStackCard';
import { CALL_DATA } from './components/MOCKSTACK';

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

    const [setselectedSort, setSetselectedSort] = useState('name_asc');
    const [filterText, setFilterText] = useState('');
    const [filterName, setFilterName] = useState('');

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

    const handleSortChange = () => {

    }


    const handleChangeName = () => {
        
    }

    const handleChangeText = () => {
        
    }

    const handleAddCall = () => {
        const newCall = JSON.parse(JSON.stringify(CALL_DATA)) ;
        newCall.id = baseCallList.length;
        setBaseCallList((prevState)=>[newCall, ...prevState]);
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
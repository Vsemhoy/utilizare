import { ClockCircleOutlined, HeartFilled, HeartOutlined, LikeOutlined, Loading3QuartersOutlined, LoadingOutlined, PlayCircleOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';


const CallStackCard = (props) => {
    const [itemId, setItemId] = useState(425);
    const [method, setMethod] = useState(1);
    const [name, setName] = useState('initialValue');
    const [link, setLink] = useState('initialValue');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [isCron, setIsCron] = useState(false);
    const [starred, setStarred] = useState(false);
    const [sortOrder, setSortOrder] = useState(1);

    const [autoCall, setAutoCall] = useState(false);

    useEffect(() => {
        setAutoCall(props.auto_call);
    }, [props.auto_call]);

    useEffect(() => {
      if (props.data){
        setItemId(props.data?.id);
        setMethod(props.data?.method);
        setName(props.data?.name);
        setLink(props.data?.link);
        setDescription(props.data?.description);
        setTags(props.data?.tags);
        setIsCron(props.data?.is_cron);
        
        setStarred(props.data?.starred);
        setSortOrder(props.data?.sort_order);

      }
    }, [props.data]);

    const makeCall = () => {

    }

    const runTrigger = () => {
        setAutoCall(!autoCall);
        if (props.on_click_autocall){
            props.on_click_autocall(!autoCall, itemId, method, link, "body");
        }
    }

    const handleStarred = () => {
        setStarred(!starred);
    }

    const handleDoubleClick = () => {
        if (props.on_double_click){
            props.on_double_click();
        }
    }

  return (
    <div className={`${autoCall ? "ut-autocall" : ""}`}>
        <div className={'ut-call-stack-card'}>
            <div>
              <div className={'ut-flex-center'}>
                {itemId}
              </div>
            </div>
            <div>
              <div style={{paddingTop: '6px'}}>
              {method == 1 && (
                <span className={'ut-method-item ut-met-get'}>
                    GET
                </span>
              )}
              {method == 2 && (
                <span className={'ut-method-item ut-met-post'}>
                    POST
                </span>
              )}
              </div>
            </div>
            <div>
              <div>
                {name}
              </div>
            </div>
            <div>
              <div>
                {link}
              </div>
            </div>
            <div>
              <div>
                {description}
              </div>
            </div>
            <div>
              <div>
                {tags}
              </div>
            </div>
            <div>
              <div className={'ut-flex-center'}>
                <span className={'ut-mini-item'}>
                    <ClockCircleOutlined />
                </span>
              </div>
            </div>
            <div>
              <div className={'ut-flex-center'}>
                <span className={'ut-mini-button'}><PlayCircleOutlined /></span>
              </div>
            </div>
            <div>
              <div className={'ut-flex-center'}>
                {autoCall == true ? (
                    <span className={'ut-mini-button active'}
                        onClick={runTrigger}
                    ><LoadingOutlined /></span>
                ) : (
                    <span className={'ut-mini-button'}
                        onClick={runTrigger}
                    ><Loading3QuartersOutlined /></span>
                )}
              </div>
            </div>
            <div>
              <div className={'ut-flex-center'}>
                <span className={'ut-mini-button'}
                    onClick={handleStarred}
                >
                {starred == false ? (
                <HeartOutlined />

                ) : (
                    <HeartFilled />
                )}
                </span>
              </div>
            </div>
        </div>
    </div>
  );
};

export default CallStackCard;
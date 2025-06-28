import { CiCircleOutlined, CiOutlined, DollarCircleOutlined } from "@ant-design/icons";


export const CALL_DATA = {
    id: 534,
    name: 'Hello',
    link: 'http://hello.world',
    method: 2,
    description: 'Hello world descre',
    tags: "",
    is_cron: true,
    starred: false,
    request_body: {},
    sort_order:  1,
    cron_interval: 0,
    cron_minutes: "",
    auto_run: false,
    user_id: 46,
    created_at: null,
    updated_at: null,
    group_id: 0,
}

export const CALL_DEFAULT_POST = {
    data: {
        id: 0,
    },
    _token: "{{TOKEN}}"
};


export const GROUPS_CALL_ITEMS = [
    {
        id: 0,
        name: "Empty",
        icon: <CiCircleOutlined />,
        color: "#444444",
    },
    {
        id: 1,
        name: "SALEC",
        icon: <DollarCircleOutlined />,
        color: "#4488bb",
    },
    {
        id: 2,
        name: "SKUD",
        icon: <DollarCircleOutlined />,
        color: "#44bb88",
    },
    {
        id: 3,
        name: "MAIN",
        icon: <DollarCircleOutlined />,
        color: "#4400bb",
    },
        {
        id: 4,
        name: "SERTIFF",
        icon: <DollarCircleOutlined />,
        color: "#bb8833",
    },
]
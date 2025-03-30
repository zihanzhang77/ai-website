import React, { useEffect } from 'react';

const CozeChat = () => {
  useEffect(() => {
    new CozeWebSDK.WebChatClient({
      config: {
        bot_id: '7486762113537818650',
      },
      componentProps: {
        title: 'Coze',
      },
      auth: {
        type: 'token',
        token: 'pat_********', // 替换为你的token
        onRefreshToken: function () {
          return 'pat_********'; // 替换为你的token
        },
      },
    });
  }, []);

  return <div id="coze-chat"></div>;
};

export default CozeChat;
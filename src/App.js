import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post(
        'https://api.coze.cn/v1/workflow/run',
        {
          workflow_id: '7486386392374050870',
          parameters: {
            user_id: '12345',
            user_name: 'George',
            input: input,
          },
        },
        {
          headers: {
            'Authorization': 'Bearer pat_ogfYMbj7TkRjfBmcyrqthysnq55mVDJZkZwyNo5p43a4QuiBokxbgBuy3soulrUx',
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200) {
        console.log('API响应数据:', response.data);
        const data = JSON.parse(response.data.data);
        if (data.output) {
          setImageUrl(data.output);
        } else {
          setError('未找到生成的图片URL，请检查API响应。');
        }
      } else {
        setError('工作流调用失败，请重试。');
        console.error('工作流调用失败:', response.statusText);
      }
    } catch (error) {
      setError('生成图片时出错，请检查API端点或网络连接。');
      console.error('生成图片时出错:', {
        message: error.message,
        url: error.config.url,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="app-container">
      <h1 className="title">AI图片生成器</h1>
      
      <div className="input-area">
        <textarea
          className="prompt-input"
          placeholder="请输入提示词..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="generate-button"
          onClick={handleGenerate}
          disabled={isLoading}
        >
          {isLoading ? '请稍等30秒...' : '立刻生成'}
        </button>
      </div>

      {isLoading && (
        <div className="loading-image-container">
          <p>生成中...</p>
        </div>
      )}

      {imageUrl && (
        <div className="image-container">
          <img src={imageUrl} alt="生成的图片" className="generated-image" />
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default App;
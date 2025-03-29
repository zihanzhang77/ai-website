import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      // 这里调用你的AI工作流API
      const response = await axios.post('/api/generate', { prompt });
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error('生成图片时出错:', error);
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
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          className="generate-button"
          onClick={handleGenerate}
          disabled={isLoading}
        >
          {isLoading ? '生成中...' : '立刻生成'}
        </button>
      </div>

      {imageUrl && (
        <div className="image-container">
          <img src={imageUrl} alt="生成的图片" className="generated-image" />
        </div>
      )}
    </div>
  );
}

export default App;
// React, { useState } 가져오기
import React, { useState } from "react";
// store.js 가져오기
import useStore from "./store/store";
// styled-components 가져오기
import styled from "styled-components";
// { FontAwesomeIcon } 가져오기
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// 해당 날씨 아이콘 가져오기
import {
  faSun,
  faCloud,
  faSnowflake,
  faCloudShowersHeavy,
  faBolt,
  faSmog,
} from "@fortawesome/free-solid-svg-icons";

// AppContainer 스타일 정의
const AppContainer = styled.div`
  background-image: url("https://i.pinimg.com/originals/14/e5/1e/14e51e45927a3cac443fa79d3f88aaec.jpg");
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// Content 스타일 정의
const Content = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
`;

// Input 스타일 정의
const Input = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;

  // 입력란 스타일 정의
  & input {
    padding: 0.5rem;
    margin: 0.5rem;
    width: 300px;
  }

  // 버튼 스타일 정의
  & button {
    padding: 0.5rem;
    margin: 0.5rem;
  }
`;

// Result 스타일 정의
const Result = styled.div`
  margin-top: 1rem;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
`;

// LoadingImg 스타일 정의
const LoadingImg = styled.img`
  width: 50px;
`;

// App 컴포넌트 정의
function App() {
  // useStore를 통해 날씨 정보 정의
  const { weather, loading, error, setCity, fetchWeather } = useStore();
  // useState를 통해 입력 상태 정의 (초기값: "")
  const [input, setInput] = useState("");
  // useState를 통해 에러 상태 정의 (초기값: null)
  const [localError, setLocalError] = useState(null);

  // 검색 버튼 클릭 시 처리하는 handleSearch 함수 정의
  const handleSearch = () => {
    // 한글 검증 정규식 koreanRegex 정의
    const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    // 입력값이 공백인 경우
    if (input.trim() === "") {
      // 에러 메시지 설정
      setLocalError("도시 이름을 입력하세요");
      return;
    }

    // 입력값이 한글인 경우
    if (koreanRegex.test(input)) {
      // 에러 메시지 설정
      setLocalError("도시 이름을 영어로 입력해주세요");
      return;
    }

    // 에러 초기화
    setLocalError(null);
    // 입력값을 도시 이름으로 설정
    setCity(input);
    // 입력값의 날씨 데이터 가져오기
    fetchWeather(input);
  };

  // 날씨 정보에 따라 아이콘 가져오는 getWeatherIcon 함수 정의
  const getWeatherIcon = () => {
    // 날씨 데이터가 없는 경우
    if (!weather || !weather.weather || weather.weather.length === 0)
      // null 반환
      return null;

    // 날씨 설명을 소문자로 변환
    const weatherDescription = weather.weather[0].description.toLowerCase();

    // 날씨 설명에 따라 아이콘 반환
    if (weatherDescription.includes("clear")) {
      return <FontAwesomeIcon icon={faSun} />;
    } else if (weatherDescription.includes("cloud")) {
      return <FontAwesomeIcon icon={faCloud} />;
    } else if (weatherDescription.includes("snow")) {
      return <FontAwesomeIcon icon={faSnowflake} />;
    } else if (weatherDescription.includes("rain")) {
      return <FontAwesomeIcon icon={faCloudShowersHeavy} />;
    } else if (weatherDescription.includes("thunderstorm")) {
      return <FontAwesomeIcon icon={faBolt} />;
    } else if (
      weatherDescription.includes("mist") ||
      weatherDescription.includes("haze")
    ) {
      return <FontAwesomeIcon icon={faSmog} />;
    } else {
      return <FontAwesomeIcon icon={faSun} />;
    }
  };

  return (
    <AppContainer>
      {/* AppContainer 스타일 적용 */}
      <Content>
        {/* Content 스타일 적용 */}
        <h1>날씨를 알려드립니다</h1>
        <Input>
          {/* Input 스타일 적용 */}
          <input
            // 입력 필드 설정
            type="text"
            id="city-input"
            name="city"
            value={input}
            // 입력값 변경 시 input 상태 재설정
            onChange={(e) => setInput(e.target.value)}
            placeholder="도시 이름을 영어로 검색해보세요"
          />
          {/* 버튼 클릭 시 handleSearch 호출 */}
          <button onClick={handleSearch}>검색</button>
        </Input>
        <Result>
          {/* Result 스타일 적용 */}
          {/* 로딩 중일 떼 스피너 보여줌 */}
          {loading && (
            <LoadingImg
              src="https://commonparent.edu-ok.co.kr:4402/RenewalParentApp/images/loading.gif"
              alt="loading"
            />
          )}
          {/* 입력 에러 발생 시 에러 메시지 출력 */}
          {localError && <p>{localError}</p>}
          {/* API 호출 에러 발생 시 에러 메시지 출력 */}
          {error && <p>{error}</p>}
          {/* 날씨 정보에 이러가 없을 시 정보 불러오기 */}
          {weather && !error && !localError && (
            <div>
              {/* 도시 이름 출력 */}
              <p>{weather.name}</p>
              <h1>
                {/* 날씨 아이콘 출력 */}
                {getWeatherIcon()}
                <br />
                {/* 날씨 온도 출력 */}
                {weather.main.temp}°C
              </h1>
              {/* 날씨 출력 */}
              <h3>{weather.weather[0].description}</h3>
            </div>
          )}
        </Result>
      </Content>
    </AppContainer>
  );
}

// App 내보내기
export default App;

// 전역 상태 관리를 위한 라이브러리 zustand 가져오기
import { create } from "zustand";
// OpenWeatherMap API 날씨 데이터 가져오는 axios 가져오기
import axios from "axios";

// 상태 생성 함수 create 가져온 useStore 정의
const useStore = create((set) => ({
  // 날씨, 도시 이름, 로딩 상태, 에러 메시지 초기화
  weather: null,
  city: "",
  loading: false,
  error: null,
  // 도시 이름 설정 함수 setCity 정의
  setCity: (city) => set({ city }),
  // 날씨 정보 가져오는 비동기 함수 fetchWeather 정의
  fetchWeather: async (city) => {
    // 날씨, 로딩 상태, 에러 메시지 초기화
    set({ weather: null, loading: true, error: null }); // 상태 초기화
    // OpenWeatherMap API를 통해 날씨 정보 요청
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a1ece86eaa2bfff4d1b9f9e9d55e0580&units=metric`
      );
      // 서버로부터 응답 받고 날씨 정보 설정, 로딩 상태 해제
      set({ weather: response.data, loading: false });
    } catch (error) {
      // 에러가 있는 경우 에러 메시지 출력, 로딩 상태 해제
      set({ error: "정확한 도시 이름을 입력해주세요", loading: false });
    }
  },
}));

// useStore 내보내기
export default useStore;

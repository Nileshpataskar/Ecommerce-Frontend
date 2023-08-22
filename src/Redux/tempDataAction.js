export const storeTempData = (data) => ({
    type: 'STORE_TEMP_DATA',
    payload: data,
  });
  
export const clearTempData = () => {
    return {
      type: "CLEAR_TEMP_DATA",
    };
  };
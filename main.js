const nama = "marcell";
const update = [];

const reserve = () => {
  for (let i = 0; i < nama.length; i++) {
    const a = nama[nama.length - 1 - i];
    console.log(a);
    update.push(a);
  }
};
reserve();

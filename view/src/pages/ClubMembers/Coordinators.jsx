function Coordinators() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-20 m-4">
      <div className="grid  grid-cols-2  gap-20 m-4">
        <div className="w-66 h-90 rounded overflow-hidden shadow-lg">
          <img
            className="w-full h-60 object-cover"
            src="1.jpg"
            alt="Sunset in the mountains"
          />
          <div className="px-6 py-4">
            <div className="text-center text-xl mb-2">Prof Simitha Patil</div>
            <div className="text-center font-bold text-xl mb-2">
              Co-ordiantor
            </div>
          </div>
        </div>
        <div className=" w-66 h-90 rounded overflow-hidden shadow-lg">
          <img
            className="w-full h-60 object-cover"
            src="1.jpg"
            alt="Sunset in the mountains"
          />
          <div className="px-6 py-4">
            <div className="text-center text-xl mb-2">Prof Chaitali Patil</div>
            <div className="text-center font-bold text-xl mb-2">
              Co-ordinator
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Coordinators;

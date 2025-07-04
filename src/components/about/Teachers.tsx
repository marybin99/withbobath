import { staffData } from "@/data/staffData";

const Teachers = () => {
  return (
    <section className="mb-20">
      <h2 className="pb-2 mb-5 text-2xl font-semibold border-b">
        더함 선생님들
      </h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {staffData.map((staff, index) => (
          <div
            key={index}
            className="p-6 transition-shadow bg-[#E4EDDC] rounded-lg shadow-md hover:shadow-lg"
          >
            <h3 className="text-2xl font-bold">{staff.name}</h3>
            <div
              className="text-sm leading-relaxed text-gray-800 break-words whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: staff.content }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Teachers;

import React, { useState, useEffect } from "react";
import { 
  Upload, 
  Eye, 
  Save, 
  ShieldCheck, 
  FileText, 
  Trash2, 
  Camera, 
  Download, 
  Loader2, 
  Lock 
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import SideBar from "../components/Sidebar";
import SummaryApi from "../common";
import { fetchUserDetails } from "../store/userSlice";

export default function AccountPreferences() {
  const user = useSelector((state) => state?.user?.user);
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState("/default-avatar.png");
  const [idDocs, setIdDocs] = useState([]);
  const [profile, setProfile] = useState({
    name: "", number: "", office: "", emergency: "", country: "", languages: ""
  });

  // Dynamic Identity Labeling Logic
  const roleLabel = user?.role === "GENERAL" ? "Developer ID" : 
                    user?.role === "SCRUM MASTER" ? "ScrumMaster ID" : 
                    "Employee ID";
  
  const displayId = user?.roleId || user?._id?.slice(-8).toUpperCase();

  // Load from Redux (Source of Truth from MongoDB)
  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        number: user.number || "",
        office: user.office || "",
        emergency: user.emergency || "",
        country: user.country || "",
        languages: user.languages || ""
      });
      setProfilePic(user.profilePic || "/default-avatar.png");
      setIdDocs(user.documents || []);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2000000) return toast.error("Image must be less than 2MB");
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setProfilePic(reader.result);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is larger than 5MB (5 * 1024 * 1024)
      if (file.size > 5242880) {
        return toast.error("File is too large! Maximum limit is 5MB.");
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const newDoc = { 
          name: file.name, 
          file: file.name, 
          url: reader.result, 
          uploadedAt: new Date().toLocaleDateString()
        };
        setIdDocs(prev => [...prev, newDoc]);
        toast.info("Document attached. Click Save to sync.");
      };
    }
  };

  const saveChanges = async () => {
    try {
      setLoading(true);
      const payload = { ...profile, profilePic, documents: idDocs };
      const res = await axios.post(SummaryApi.updateUser.url, payload, { withCredentials: true });
      
      if (res.data.success) {
        toast.success("Changes Saved Successfully");
        dispatch(fetchUserDetails()); 
      }
    } catch (err) {
      toast.error("Failed to save changes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const removeDoc = (index) => {
    setIdDocs(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex min-h-screen bg-[#0b0f1a] text-gray-200">
      <SideBar />
      <main className={`flex-1 transition-all duration-300 p-8 ${isOpen ? "ml-64" : "ml-20"}`}>
        <div className="max-w-6xl mx-auto space-y-8">
          
          <header className="flex justify-between items-center border-b border-white/5 pb-6">
            <div>
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Account Settings</h1>
              <p className="text-blue-500 text-[10px] font-black uppercase tracking-widest mt-1">
                {roleLabel}: <span className="text-gray-400">{displayId}</span>
              </p>
            </div>
            <button 
              onClick={saveChanges} 
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-500 px-8 py-3 rounded-2xl font-black text-xs uppercase flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20 disabled:bg-gray-700"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
              {loading ? "Syncing..." : "Save Changes"}
            </button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Avatar Card */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#111827] border border-white/5 rounded-[2.5rem] p-8 flex flex-col items-center shadow-2xl relative">
                <div className="relative">
                  <img src={profilePic} className="w-32 h-32 rounded-full object-cover border-4 border-blue-600/20 shadow-xl" alt="avatar" />
                  <label className="absolute bottom-1 right-1 bg-blue-600 p-2.5 rounded-full cursor-pointer border-2 border-[#111827] hover:scale-110 transition-transform shadow-lg">
                    <Camera size={14} className="text-white" />
                    <input type="file" className="hidden" accept="image/*" onChange={handlePicChange} />
                  </label>
                </div>
                <h2 className="mt-4 text-xl font-bold text-white">{profile.name || "User"}</h2>
                <span className="text-blue-500 text-[10px] font-black uppercase tracking-widest bg-blue-500/10 px-4 py-1.5 rounded-full mt-2 border border-blue-500/20">
                  {user?.role}
                </span>
              </div>

              <div className="bg-green-500/5 border border-green-500/10 rounded-2xl p-5 flex items-center gap-4">
                <div className="p-3 bg-green-500/10 rounded-xl">
                  <ShieldCheck className="text-green-500" size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-green-500 uppercase">Verified Account</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-tight">Enterprise Level Security Active</p>
                </div>
              </div>
            </div>

            {/* Right: Info & Docs */}
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-[#111827] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl">
                <h3 className="text-sm font-black uppercase mb-6 text-gray-400 tracking-widest border-l-4 border-blue-600 pl-4">Personal Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* READ-ONLY IDENTITY FIELDS */}
                  <div className="relative group">
                    <InputBox 
                      label="Full Name" 
                      name="name" 
                      value={profile.name} 
                      readOnly 
                      className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-5 py-4 text-sm outline-none transition-all cursor-not-allowed text-gray-500"
                    />
                    <Lock size={12} className="absolute right-4 top-11 text-gray-600" />
                  </div>

                  <div className="relative group">
                    <InputBox 
                      label="Primary Phone" 
                      name="number" 
                      value={profile.number} 
                      readOnly 
                      className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-5 py-4 text-sm outline-none transition-all cursor-not-allowed text-gray-500"
                    />
                    <Lock size={12} className="absolute right-4 top-11 text-gray-600" />
                  </div>

                  {/* EDITABLE FIELDS */}
                  <InputBox label="Work Station" name="office" value={profile.office} onChange={handleInputChange} />
                  <InputBox label="Emergency Contact" name="emergency" value={profile.emergency} onChange={handleInputChange} />
                  <InputBox label="Country" name="country" value={profile.country} onChange={handleInputChange} />
                  <InputBox label="Languages" name="languages" value={profile.languages} onChange={handleInputChange} />
                </div>
              </div>

              {/* Document Section */}
              <div className="bg-[#111827] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-black uppercase text-gray-400 tracking-widest border-l-4 border-purple-600 pl-4">Documents Vault</h3>
                  <label className="text-[10px] bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl border border-white/10 cursor-pointer font-bold transition-all uppercase tracking-widest">
                    + Add Document
                    <input type="file" className="hidden" onChange={handleFileUpload} />
                  </label>
                </div>
                
                <div className="space-y-3">
                  {idDocs.length === 0 && (
                    <div className="text-center py-10 border-2 border-dashed border-white/5 rounded-3xl">
                      <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">Vault is currently empty</p>
                    </div>
                  )}
                  {idDocs.map((doc, i) => (
                    <div key={i} className="flex justify-between items-center bg-white/[0.02] p-4 rounded-2xl border border-white/5 group hover:border-blue-500/30 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                          <FileText size={18} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-200">{doc.name}</p>
                          <p className="text-[9px] text-gray-500 uppercase font-black">Uploaded: {doc.uploadedAt || "Earlier"}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <a href={doc.url} download={doc.file} className="p-2 text-gray-500 hover:text-white transition-colors">
                          <Download size={18} />
                        </a>
                        <button onClick={() => removeDoc(i)} className="p-2 text-gray-500 hover:text-red-500 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const InputBox = ({ label, className, ...props }) => (
  <div className="space-y-1 w-full">
    <label className="text-[10px] text-gray-500 font-black uppercase ml-2 tracking-widest">{label}</label>
    <input 
      {...props} 
      className={className || "w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-sm focus:border-blue-500 outline-none transition-all placeholder:text-gray-700 text-white"} 
    />
  </div>
);
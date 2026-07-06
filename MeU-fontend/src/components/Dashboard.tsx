import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    if (!localStorage.getItem('access_token')) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 font-sans">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center space-y-6">
                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Bạn đã đăng nhập thành công!</h1>
                    <p className="text-xl text-blue-600 font-medium">
                        Hello, {user?.name || 'User'} 👋
                    </p>
                </div>

                <button 
                    onClick={handleLogout}
                    className="w-full mt-8 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                    Đăng xuất
                </button>
            </div>
        </div>
    );
};

export default Dashboard;

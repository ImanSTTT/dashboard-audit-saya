
import React, { useState, useMemo, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { RequestList } from './components/RequestList';
import { EvidenceBank } from './components/EvidenceBank';
import { AddProjectModal } from './components/modals/AddProjectModal';
import { AddRequestModal } from './components/modals/AddRequestModal';
import { AddEvidenceModal } from './components/modals/AddEvidenceModal';
import { AuditProject, AuditRequest, Evidence, RequestStatus } from './types';
import { db } from './firebase';
import { collection, addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';

type View = 'dashboard' | 'permintaan' | 'bukti';

const App: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  
  const [isAddProjectModalOpen, setAddProjectModalOpen] = useState(false);
  const [isAddRequestModalOpen, setAddRequestModalOpen] = useState(false);
  const [isAddEvidenceModalOpen, setAddEvidenceModalOpen] = useState(false);
  
  const [projects, setProjects] = useState<AuditProject[]>([]);
  const [evidence, setEvidence] = useState<Evidence[]>([]);
  const [requests, setRequests] = useState<AuditRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const unsubProjects = onSnapshot(collection(db, 'projects'), 
      (snapshot) => {
        const projectsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AuditProject));
        setProjects(projectsList);
      },
      (error) => {
        console.error("Error listening to projects collection:", error);
      }
    );

    const unsubRequests = onSnapshot(collection(db, 'requests'), 
      (snapshot) => {
        const requestsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AuditRequest));
        setRequests(requestsList);
      },
      (error) => {
        console.error("Error listening to requests collection:", error);
      }
    );

    const unsubEvidence = onSnapshot(collection(db, 'evidence'), 
      (snapshot) => {
        const evidenceList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Evidence));
        setEvidence(evidenceList);
        setLoading(false); // Data loaded
      },
      (error) => {
        console.error("Error listening to evidence collection:", error);
        setLoading(false);
      }
    );

    // Cleanup listeners on component unmount
    return () => {
      unsubProjects();
      unsubRequests();
      unsubEvidence();
    };
  }, []);


  const addProject = async (name: string) => {
    try {
      await addDoc(collection(db, 'projects'), { name });
      setAddProjectModalOpen(false);
    } catch (error) {
      console.error("Error adding project: ", error);
    }
  };
  
  const addRequest = async (requestData: Omit<AuditRequest, 'id' | 'status'>) => {
     try {
       const newRequestData = {
         ...requestData,
         status: RequestStatus.NotStarted,
       };
       await addDoc(collection(db, 'requests'), newRequestData);
       setAddRequestModalOpen(false);
     } catch (error) {
       console.error("Error adding request: ", error);
     }
  };
  
  const addEvidence = async (evidenceData: Omit<Evidence, 'id' | 'fileLink'>) => {
     try {
       const newEvidenceData = {
         ...evidenceData,
         fileLink: '#', // Placeholder, you might want to integrate with Firebase Storage later
       };
       await addDoc(collection(db, 'evidence'), newEvidenceData);
       setAddEvidenceModalOpen(false);
     } catch (error) {
       console.error("Error adding evidence: ", error);
     }
  };
  
  const deleteRequest = async (requestId: string) => {
    try {
      await deleteDoc(doc(db, 'requests', requestId));
    } catch (error) {
      console.error("Error deleting request: ", error);
    }
  };

  const deleteEvidence = async (evidenceId: string) => {
    try {
      await deleteDoc(doc(db, 'evidence', evidenceId));
    } catch (error)
      {
      console.error("Error deleting evidence: ", error);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-full">
          <div className="flex items-center space-x-2">
             <i className="fa-solid fa-spinner fa-spin text-2xl text-brand-blue"></i>
             <span className="text-lg">Menghubungkan ke database...</span>
          </div>
        </div>
      );
    }
    switch (currentView) {
      case 'dashboard':
        return <Dashboard projects={projects} requests={requests} />;
      case 'permintaan':
        return <RequestList 
            projects={projects} 
            requests={requests} 
            evidence={evidence} 
            onAddProject={() => setAddProjectModalOpen(true)}
            onAddRequest={() => setAddRequestModalOpen(true)}
            onDeleteRequest={deleteRequest}
        />;
      case 'bukti':
        return <EvidenceBank 
            evidence={evidence} 
            onAddEvidence={() => setAddEvidenceModalOpen(true)}
            onDeleteEvidence={deleteEvidence} 
        />;
      default:
        return <Dashboard projects={projects} requests={requests} />;
    }
  };

  const mainContentPadding = useMemo(() => {
    return sidebarCollapsed ? 'pl-20' : 'pl-64';
  }, [sidebarCollapsed]);

  return (
    <div className="flex h-screen bg-dark-bg text-dark-text">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${mainContentPadding}`}>
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
      
      <AddProjectModal
        isOpen={isAddProjectModalOpen}
        onClose={() => setAddProjectModalOpen(false)}
        onSave={addProject}
      />
      <AddRequestModal
        isOpen={isAddRequestModalOpen}
        onClose={() => setAddRequestModalOpen(false)}
        onSave={addRequest}
        evidenceList={evidence}
      />
      <AddEvidenceModal
        isOpen={isAddEvidenceModalOpen}
        onClose={() => setAddEvidenceModalOpen(false)}
        onSave={addEvidence}
        requestList={requests}
      />
    </div>
  );
};

export default App;

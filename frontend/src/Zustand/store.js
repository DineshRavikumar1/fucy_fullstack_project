import { createWithEqualityFn } from 'zustand/traditional';
import { addEdge, applyNodeChanges, applyEdgeChanges } from 'reactflow';

import axios from 'axios';
import { configuration } from '../services/baseApiService';

const useStore = createWithEqualityFn((set, get) => ({
    attackNodes: [],
    attackEdges: [],
    cyberNodes: [],
    cyberEdges: [],
    nodes: [],
    edges: [],
    sidebarNodes: [],
    template: [],
    selectedTemplate: {},
    Modals: [],
    modal: {},
    DamageScenaris: [],
    scenerio: {},
    component: [],

    //Normal Nodes
    onNodesChange: (changes) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes)
        });
    },
    onEdgesChange: (changes) => {
        set({
            edges: applyEdgeChanges(changes, get().edges)
        });
    },
    onConnect: (connection) => {
        set({
            edges: addEdge(connection, get().edges)
        });
    },
    setNodes: (newNodes) => {
        set({
            nodes: newNodes
        });
    },
    setEdges: (newEdges) => {
        set({
            edges: newEdges
        });
    },

    //Attack tree Section
    onAttackNodesChange: (changes) => {
        set({
            attackNodes: applyNodeChanges(changes, get().attackNodes)
        });
    },
    onAttckEdgesChange: (changes) => {
        set({
            attackEdges: applyEdgeChanges(changes, get().attackEdges)
        });
    },
    onAttackConnect: (connection) => {
        set({
            attackEdges: addEdge(connection, get().attackEdges)
        });
    },

    setAttackNodes: (newNodes) => {
        set({
            attackNodes: newNodes
        });
    },

    setAttackEdges: (newEdges) => {
        set({
            attackEdges: newEdges
        });
    },

    //Cybersecurity Section
    onCyberNodesChange: (changes) => {
        set({
            cyberNodes: applyNodeChanges(changes, get().cyberNodes)
        });
    },
    onCyberEdgesChange: (changes) => {
        set({
            cyberEdges: applyEdgeChanges(changes, get().cyberEdges)
        });
    },
    onCyberConnect: (connection) => {
        set({
            cyberEdges: addEdge(connection, get().cyberEdges)
        });
    },
    setCyberNodes: (newNodes) => {
        set({
            cyberNodes: newNodes
        });
    },

    setCyberEdges: (newEdges) => {
        set({
            cyberEdges: newEdges
        });
    },
    
    getIntersectingNodes: () => {
        let nodes = get().nodes;
        const groups = nodes?.filter(nd => nd?.type === 'group');
        const intersectingNodesMap = {};
    
        function doNodesTouch(nodeA, nodeB) {
            const aLeft = nodeA.x;
            const aRight = nodeA.x + nodeA.width;
            const aTop = nodeA.y;
            const aBottom = nodeA.y + nodeA.height;
    
            const bLeft = nodeB.x;
            const bRight = nodeB.x + nodeB.width;
            const bTop = nodeB.y;
            const bBottom = nodeB.y + nodeB.height;
    
            const horizontalOverlap = aRight >= bLeft && aLeft <= bRight;
            const verticalOverlap = aBottom >= bTop && aTop <= bBottom;
    
            return horizontalOverlap && verticalOverlap;
        }
    
        if(groups) {
            groups.forEach(group => {
                const area = {
                    x: group?.position?.x,
                    y: group?.position?.y,
                    width: group?.width,
                    height: group?.height
                };
    
                const intersectingNodes = nodes.filter(node => {
                    if (node.type !== 'group') {
                        const nodeRect = {
                            x: node.position.x,
                            y: node.position.y,
                            width: node.width,
                            height: node.height,
                        };
                        return doNodesTouch(area, nodeRect);
                    }
                    return false;
                }).map(node => ({
                    ...node,
                    parentId: group.id,
                    extent: 'parent'
                }));
    
                intersectingNodesMap[group.id] = intersectingNodes;
            });
        }
        return [intersectingNodesMap, nodes];
    },

    getGroupedNodes: () => {
        let nodes = get().nodes;
        // console.log('nodes', nodes)
        const groups = nodes?.filter(nd => nd?.type === 'group');
        const intersectingNodesMap = {};
    
        function doNodesTouch(nodeA, nodeB) {
            const aLeft = nodeA.x;
            const aRight = nodeA.x + nodeA.width;
            const aTop = nodeA.y;
            const aBottom = nodeA.y + nodeA.height;
    
            const bLeft = nodeB.x;
            const bRight = nodeB.x + nodeB.width;
            const bTop = nodeB.y;
            const bBottom = nodeB.y + nodeB.height;
    
            const horizontalOverlap = aRight >= bLeft && aLeft <= bRight;
            const verticalOverlap = aBottom >= bTop && aTop <= bBottom;
    
            return horizontalOverlap && verticalOverlap;
        }
    
        if(groups) {
            groups.forEach(group => {
                const area = {
                    x: group?.position?.x,
                    y: group?.position?.y,
                    width: group?.width,
                    height: group?.height
                };
    
                const intersectingNodes = nodes.filter(node => {
                    if (node.type !== 'group') {
                        const nodeRect = {
                            x: node.position.x,
                            y: node.position.y,
                            width: node.width,
                            height: node.height,
                        };
                        return doNodesTouch(area, nodeRect);
                    }
                    return false;
                }).map(node => ({
                    ...node,
                    parentId: group.id,
                    extent: 'parent'
                }));
    
                intersectingNodesMap[group.id] = intersectingNodes;
            });
        }
        return [intersectingNodesMap, nodes];
    },
    
    
    //fetch or GET section
    fetchAPI: async () => {
        const res = await axios.get(`${configuration.apiBaseUrl}template`);
        set({
            template: res.data
        });
    },

    getSidebarNode: async () => {
        const res = await axios.get(`${configuration.apiBaseUrl}sidebarNode2`);
        set({
            sidebarNodes: res.data
        });
    },

    getTemplate: async (id) => {
        const res = await axios.get(`${configuration.apiBaseUrl}template?id=${id}`);
        set({
            selectedTemplate: res.data[0],
            nodes: res['data'][0]['template']['nodes'],
            edges: res['data'][0]['template']['edges']
        });
    },

    getModals: async () => {
        const res = await axios.get(`${configuration.apiBaseUrl}Modals`);
        set({
            Modals: res.data
        });
    },

    getModalById: async (id) => {
        if(id){const res = await axios.get(`${configuration.apiBaseUrl}Modals/${id}`);
        // console.log('res.data ...', res.data);
        set({
            modal: res.data
        });}
    },
    getDamageScenarios: async () => {
        const res = await axios.get(`${configuration.apiBaseUrl}Damage-scenarios`);
        set({
            DamageScenaris: res.data
        });
    },
    getUniqueDamageScenario: async (id) => {
        const res = await axios.get(`${configuration.apiBaseUrl}Damage-scenarios/${id}`);
        set({
            scenerio: res.data
        });
    },

    getComponent: async () => {
      const res = await axios.get(`${configuration.backendUrl}getComponent`);
      console.log('res', res);
      // set({
      //   component:res.data,
      // })
  },

    //Update Section

    updateTemplate: async (newTemplate) => {
        const res = await axios.patch(`${configuration.apiBaseUrl}template/${newTemplate.id}`, newTemplate);
        console.log('res', res);
    },

    updateModal: async (newModal) => {
        console.log('newModal', newModal);
        const res = await axios.patch(`${configuration.apiBaseUrl}Modals/${newModal?.id}`, newModal);
        console.log('res', res);
        if (res) {
            // alert('Updated');
            // window.location.reload();
            console.log('res', res)
            return res;
        }
    },

    
    updateAttackNode: (nodeId, name) => {
      set((state) => {
          let node = state.attackNodes.find((ite) => ite.id === nodeId);
          const ind = state.attackNodes.findIndex((ite) => ite.id === nodeId);
          node.data.label = name;
          state.attackNodes[ind] = node;
          return {
              attackNodes: [...state.attackNodes]
          };
      });
  },

    //Add Section

    createComponent: async (newTemplate) => {
        // const res = await axios.post(`${configuration.backendUrl}createComponent`,newTemplate)
        const res = await axios.post(`${configuration.backendUrl}createComponent`, newTemplate);
        console.log('res', res);
    },

    addTemplate: async (newTemplate) => {
        try {
            const res = await axios.post(`${configuration.apiBaseUrl}template`, newTemplate);
            // console.log('res store', res)
            if (res) {
                setTimeout(() => {
                    // alert('Added Succesfully');
                    window.location.reload();
                }, 500);
            }
        } catch (err) {
            console.log('err', err)
            // setTimeout(() => {
                // alert('Something went Wrong');
            // }, 1000);
        }
    },

    addDamageScenario: async (newTemplate) => {
        console.log('newTemplate', newTemplate);
        try {
            const res = await axios.post(`${configuration.apiBaseUrl}Damage-scenarios`, newTemplate);
            // console.log('res store', res)
            if (res) {
              return res;
            }
        } catch (err) {
            console.log('err', err)
            // setTimeout(() => {
            //     alert('Something went Wrong');
            // }, 1000);
        }
    },

    dragAdd: (newNode) => {
        // console.log('newNode', newNode);
        set((state) => ({
            nodes: [...state.nodes, newNode]
        }));
    },

    addAttackNode: (newNode) => {
        // console.log('newNode', newNode);
        set((state) => ({
            attackNodes: [...state.attackNodes, newNode]
        }));
    },

    dragAddNode: (newNode, newEdge) => {
        // console.log("store",newNode);
        set((state) => ({
            nodes: state.nodes.concat(newNode),
            edges: state.edges.concat(newEdge)
        }));
    },
    
    addNewNode: async (newNode) => {
        // console.log('newNode',newNode);
        const res = await axios.post(`${configuration.apiBaseUrl}sidebarNode`, newNode);
        return res; 
    },

    createModal: async (newModal) => {
          try {
              const res = await axios.post(`${configuration.apiBaseUrl}Modals`, newModal);
              if (res) {
                  console.log('res store', res);
                  localStorage.setItem('currentId', res?.data?.id);
                  return res;
              }
          } catch (err) {
              console.log('err', err);
            //   if (err) {
            //       alert('Something went Wrong');
            //   }
          }
      },

      addCyberNode: (newNode) => {
        // console.log('newNode', newNode);
        set((state) => ({
            cyberNodes: [...state.cyberNodes, newNode]
        }));
    },

    //Delete Section 

    deleteNode: async (id) => {
        const res = await axios.delete(`${configuration.apiBaseUrl}sidebarNode/${id}`);
        console.log('res', res);
    },

    deleteTemplate: async (id) => {
        const res = await axios.delete(`${configuration.apiBaseUrl}template/${id}`);
        console.log('res', res);
        if (res) {
            setTimeout(() => {
                alert('Deleted Succesfully');
            });
        }
    },


}));

export default useStore;

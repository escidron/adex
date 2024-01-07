export default async function AddCompany(name,image,address,industry,hasPhysicalSpace,editCompany,id) {
    
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/${editCompany ? 'edit-company' : 'add-company'}`,
        {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'        
          },
          credentials: "include",
          body: JSON.stringify({ 
            name,
            image,
            address,
            industry,
            hasPhysicalSpace ,
            id
          }),
        }
      );
  
      if (response.status === 200) {
        const res = await response.json();
        console.log('message',res);
        const message = res.message
        return message;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
import { html } from 'https://unpkg.com/lit-html?module';

export const tableTemplate = () => html`
    <button id="loadBooks">LOAD ALL BOOKS</button>
       <table>
           <thead>
               <tr>
                   <th>Title</th>
                   <th>Author</th>
                   <th>Action</th>
               </tr>
           </thead>
           <tbody>
           </tbody>
       </table>
    <form id="add-form">
        <h3>Add book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Submit">
    </form>
`;
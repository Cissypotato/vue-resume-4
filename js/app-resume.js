

Vue.component('app-resume',{
    props:['display-resume'],
    data(){
        return {
            
          
        }
    },
    computed:{
        modeState(){
            return this.$store.state.mode
        }
    },
    methods:{
        addSkill(){
            this.$store.state.resume.skills.push({name:"技能名称",description:"技能描述"})
        },
        deleteSkill(index){
            this.$store.state.resume.skills.splice(index,1)
        },
        addProject(){
            this.$store.state.resume.projects.push( {name:"项目名称",keywords:"关键字",link:"项目链接",description:"项目描述"})
        },
        deleteProject(index){
            this.$store.state.resume.projects.splice(index,1)
        },
        edit(key,value){
            this.$store.state.resume[key]=value
        },
        editSkill(index,key,value){
            this.$store.state.resume.skills[index][key]=value
        },
        editProject(index,key,value){
            this.$store.state.resume.projects[index][key]=value
        },
        
    },
    template:`
    <div class="resume">
            <section class="about">
                
                <h1>
                    <editable-span :disabled="modeState==='preview'" v-bind:value="displayResume.name" v-on:edit="edit('name',$event)"></editable-span>
                </h1>
                <p>
                    <editable-span :disabled="modeState==='preview'" v-bind:value="displayResume.jobIntention" v-on:edit="edit('jobIntention',$event)"></editable-span>
                </p>
                
                <p>
                    <editable-span :disabled="modeState==='preview'" v-bind:value="displayResume.gender" v-on:edit="edit('gender',$event)"></editable-span>
                    |<editable-span :disabled="modeState==='preview'" v-bind:value="displayResume.birthday" v-on:edit="edit('birthday',$event)"></editable-span>
                    |<editable-span :disabled="modeState==='preview'" v-bind:value="displayResume.email" v-on:edit="edit('email',$event)"></editable-span>
                    |<editable-span :disabled="modeState==='preview'" v-bind:value="displayResume.phone" v-on:edit="edit('phone',$event)"></editable-span>
                </p>
            </section>
    
            <section class="skills">
                <h2>技能</h2>
                <ul class="skillWrap">
                    <li v-for="(skill,index) in displayResume.skills">
                    
                       <div>
                           <editable-span :disabled="modeState==='preview'" v-bind:value="skill.name" v-on:edit="editSkill(index,'name',$event)" ></editable-span>
                           
                        </div>
                       <div>
                            <editable-span  :disabled="modeState==='preview'" v-bind:value="skill.description" v-on:edit="editSkill(index,'description',$event)"></editable-span>
                        </div> 
                       
                        <span  v-show="index>=4" v-on:click="deleteSkill(index)" v-if="modeState==='edit'" class="deleteSkill" >x</span>
                    </li>
                    
                    <li v-if="modeState==='edit'" class="addSkill">
                        <span v-on:click="addSkill">添加</span>
                    </li>
                </ul>
            </section>
    
    
            <section class="projects">
                    <h2>项目</h2>
                <ul class="projectWrap" >
                    <li v-for="(project,index) in displayResume.projects">
                        <h3><editable-span :disabled="modeState==='preview'" v-bind:value="project.name" v-on:edit="editProject(index,'name',$event)"></editable-span></h3>
                        <a href="#"><editable-span :disabled="modeState==='preview'" v-bind:value="project.keywords" v-on:edit="editProject(index,'keywords',$event)"></editable-span></a>
                        <p><editable-span :disabled="modeState==='preview'" v-bind:value="project.link" v-on:edit="editProject(index,'link',$event)"></editable-span></p>
                        <p><editable-span :disabled="modeState==='preview'" v-bind:value="project.description" v-on:edit="editProject(index,'description',$event)"></editable-span></p>
                        <span  v-show="index>=2" v-on:click="deleteProject(index)" v-if="modeState==='edit'" class="deleteProject">x</span>
                    </li>
                    <li v-if="modeState ==='edit'" class="addProject">
                        <span v-on:click="addProject">添加</span>
                    </li>
                </ul>
            </section>
        </div>
        `
})
///
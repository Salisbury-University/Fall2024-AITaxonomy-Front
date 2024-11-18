import * as React from "react"
import { ChevronRight } from "lucide-react"
import Link from 'next/link'
import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { title } from "process"

interface TaxonomyItem {
    name: string;
    subCategories: Record<string, string[]>;
  }
  
  interface NavItem {
    title: string;
    url: string;
    items?: NavItem[];
  }
  
  interface DataStructure {
    versions: string[];
    navMain: NavItem[];
  }
  

// This is sample data.
const taxonomy = [
    {
        name: "Agricultural sciences and natural resources",
        subCategories: {
            "Agricultural, animal, plant, and veterinary sciences": [
                "Agronomy and crop science",
                "Animal sciences",
                "Food science and technology",
                "Plant sciences",
                "Soil sciences",
                "Veterinary biomedical and clinical sciences",
                "Agricultural, animal, plant, and veterinary sciences nec"
            ],
            "Natural resources and conservation": [
                "Environmental science",
                "Environmental/ natural resources management and policy",
                "Forestry",
                "Natural resources conservation and research",
                "Natural resources and conservation nec"
            ]
        }
    },
    {
        name: "Biological and biomedical sciences",
        subCategories: {
            "Biochemistry, biophysics, and molecular biology": [
                "Biochemistry",
                "Biochemistry and molecular biology",
                "Biophysics",
                "Molecular biology",
                "Biochemistry, biophysics, and molecular biology nec"
            ],
            "Bioinformatics, biostatistics, and computational biology": [
                "Bioinformatics",
                "Biostatistics",
                "Computational biology",
                "Bioinformatics, biostatistics, and computational biology nec"
            ],
            "Cell/ cellular biology and anatomy": [
                "Cell/ cellular and molecular biology",
                "Developmental biology and embryology",
                "Cell/ cellular biology and anatomy nec"
            ],
            "Ecology, evolutionary biology, and epidemiology": [
                "Ecology",
                "Ecology and evolutionary biology",
                "Epidemiology",
                "Epidemiology and biostatistics",
                "Evolutionary biology",
                "Ecology, evolutionary biology, and epidemiology nec"
            ],
            "Genetics and genomics": [
                "Genetics, general",
                "Genome sciences and genomics",
                "Human/ medical genetics",
                "Molecular genetics",
                "Genetics nec"
            ],
            "Microbiology and immunology": [
                "Immunology",
                "Microbiology and immunology",
                "Microbiology, general",
                "Virology",
                "Microbiology and immunology nec"
            ],
            "Neurobiology and neurosciences": [
                "Cognitive neuroscience",
                "Neurobiology and anatomy",
                "Neuroscience",
                "Neurobiology and neurosciences nec"
            ],
            "Pharmacology and toxicology": [
                "Pharmacology",
                "Toxicology",
                "Pharmacology and toxicology nec"
            ],
            "Physiology, oncology and cancer biology": [
                "Biomechanics",
                "Exercise physiology and kinesiology",
                "Oncology and cancer biology",
                "Physiology, general",
                "Physiology, oncology and cancer biology nec"
            ],
            "Biological and biomedical sciences, other": [
                "Biology/ biological sciences, general",
                "Biomedical sciences, general",
                "Botany and plant biology",
                "Entomology",
                "Plant pathology and phytopathology",
                "Plant physiology and biology nec",
                "Zoology and animal biology",
                "Biological and biomedical sciences nec"
            ]
        }
    },
    {
        name: "Computer and information sciences",
        subCategories: {
            "Computer science": [
                "Computer science"
            ],
            "Computer and information sciences, other": [
                "Artificial intelligence",
                "Computer and information sciences, general",
                "Computer systems networking and telecommunications",
                "Informatics and information technology",
                "Information science/ studies",
                "Computer and information sciences nec"
            ]
        }
    },
    {
        name: "Engineering",
        subCategories: {
            "Biological, biomedical, and biosystems engineering": [
                "Bioengineering and biomedical engineering",
                "Biological and biosystems engineering and biomedical technology"
            ],
            "Chemical and petroleum engineering": [
                "Chemical and biomolecular engineering",
                "Chemical engineering",
                "Petroleum engineering",
                "Chemical and petroleum engineering nec"
            ],
            "Civil, environmental, and transportation engineering": [
                "Civil engineering",
                "Environmental/ environmental health engineering",
                "Geotechnical and geoenvironmental engineering",
                "Structural engineering",
                "Transportation and highway engineering",
                "Civil, environmental, and transportation engineering nec"
            ],
            "Electrical and computer engineering": [
                "Computer engineering",
                "Electrical and computer engineering",
                "Electrical and electronics engineering",
                "Electrical and computer engineering nec"
            ],
            "Engineering technologies": [
                "Electrical and electronic engineering technologies",
                "Electromechanical technologies",
                "Environmental control technologies",
                "Engineering technologies nec"
            ],
            "Industrial engineering and operations research": [
                "Industrial engineering",
                "Operations research",
                "Systems and manufacturing engineering"
            ],
            "Materials and mining engineering": [
                "Materials engineering",
                "Materials science and engineering",
                "Materials and mining engineering nec"
            ],
            "Mechanical engineering": [
                "Mechanical engineering, general"
            ],
            "Engineering, other": [
                "Aerospace, aeronautical, astronautical, and space engineering",
                "Engineering mechanics, physics, and science",
                "Nanotechnology",
                "Nuclear engineering",
                "Engineering nec"
            ]
        }
    },
    {
        name: "Geosciences, atmospheric, and ocean sciences",
        subCategories: {
            "Geological and earth sciences": [
                "Geochemistry",
                "Geology",
                "Geology/ earth science, general",
                "Geophysics and seismology",
                "Hydrology and water resources science",
                "Geological and earth sciences nec"
            ],
            "Ocean/ marine sciences and atmospheric science": [
                "Atmospheric sciences and meteorology, general",
                "Climatology, atmospheric chemistry and physics",
                "Marine biology and biological oceanography",
                "Marine sciences",
                "Oceanography, chemical and physical",
                "Atmospheric sciences and meteorology nec"
            ]
        }
    },
    {
        name: "Health sciences",
        subCategories: {
            "Nursing and nursing science": [
                "Nursing education",
                "Nursing science",
                "Nursing specialties and practice"
            ],
            "Pharmacy and pharmaceutical sciences": [
                "Medicinal and pharmaceutical chemistry",
                "Pharmaceutical sciences",
                "Pharmacy, pharmaceutical sciences, and administration nec"
            ],
            "Public health": [
                "Environmental health",
                "Health services research",
                "Health/ medical physics",
                "Public health education and promotion",
                "Public health, general",
                "Public health nec"
            ],
            "Health sciences, other": [
                "Communication disorders sciences",
                "Exercise science and kinesiology",
                "Health sciences, general",
                "Marriage and family therapy/ counseling",
                "Medical clinical science",
                "Medical, biomedical, and health informatics",
                "Mental health, counseling, and therapy services and sciences",
                "Rehabilitation and therapeutic sciences",
                "Health sciences nec"
            ]
        }
    },
    {
        name: "Mathematics and statistics",
        subCategories: {
            "Applied mathematics": [
                "Applied mathematics, general",
                "Computational and applied mathematics",
                "Applied mathematics nec"
            ],
            "Mathematics": [
                "Algebra and number theory",
                "Mathematics, general",
                "Mathematics nec"
            ],
            "Statistics": [
                "Applied statistics, general",
                "Mathematics and statistics",
                "Statistics",
                "Statistics nec"
            ]
        }
    },
    {
        name: "Multidisciplinary/ interdisciplinary sciences",
        subCategories: {
            "Interdisciplinary computer sciences": [
                "Computer science and engineering",
                "Electrical engineering and computer science",
                "Interdisciplinary computer sciences nec"
            ],
            "Multidisciplinary/ interdisciplinary sciences, other": [
                "Behavioral and cognitive sciences",
                "Computational science and engineering",
                "Data science and data analytics",
                "History/ philosophy of science, technology and society",
                "Nanoscience/ nanoscale science",
                "Nutrition sciences",
                "Multidisciplinary/ interdisciplinary sciences nec"
            ]
        }
    },
    {
        name: "Physical sciences",
        subCategories: {
            "Astronomy and astrophysics": [
                "Astronomy",
                "Astrophysics",
                "Astronomy and astrophysics nec"
            ],
            "Chemistry": [
                "Analytical chemistry",
                "Chemical biology",
                "Chemistry, general",
                "Inorganic chemistry",
                "Organic chemistry",
                "Physical chemistry",
                "Polymer chemistry",
                "Theoretical chemistry",
                "Chemistry nec"
            ],
            "Materials sciences": [
                "Materials science",
                "Materials chemistry and materials science nec"
            ],
            "Physics": [
                "Applied physics",
                "Atomic/ molecular physics",
                "Condensed matter and materials physics",
                "Elementary particle physics",
                "Nuclear physics",
                "Optics/ optical sciences",
                "Physics and astronomy",
                "Physics, general",
                "Plasma and high-temperature physics",
                "Theoretical and mathematical physics",
                "Physics and physical sciences nec"
            ]
        }
    },
    {
        name: "Psychology",
        subCategories: {
            "Clinical psychology": [
                "Clinical child psychology",
                "Clinical psychology"
            ],
            "Counseling and applied psychology": [
                "Applied behavior analysis",
                "Counseling psychology",
                "Educational psychology",
                "Industrial and organizational psychology",
                "School psychology",
                "Counseling and applied psychology nec"
            ],
            "Research and experimental psychology": [
                "Behavioral neuroscience",
                "Cognitive psychology and psycholinguistics",
                "Developmental and child psychology",
                "Experimental psychology",
                "Social psychology",
                "Research and experimental psychology nec"
            ],
            "Psychology, other": [
                "Human development",
                "Psychology, general",
                "Psychology nec"
            ]
        }
    },
    {
        name: "Social sciences",
        subCategories: {
            "Anthropology": [
                "Anthropology, general",
                "Cultural anthropology",
                "Physical and biological anthropology",
                "Anthropology nec"
            ],
            "Area, ethnic, cultural, gender, and group studies": [
                "Area studies",
                "Ethnic studies",
                "Area, ethnic, cultural, gender, and group studies nec"
            ],
            "Economics": [
                "Agricultural economics",
                "Applied economics",
                "Development economics and international development",
                "Econometrics and quantitative economics",
                "Economics, general",
                "Environmental/ natural resource economics",
                "Economics nec"
            ],
            "Political science and government": [
                "Political science and government, general",
                "Political science and government nec"
            ],
            "Public policy analysis": [
                "Education policy analysis",
                "Health policy analysis",
                "Public policy analysis, general",
                "Public policy nec"
            ],
            "Sociology, demography, and population studies": [
                "Sociology, general",
                "Sociology, demography, and population studies nec"
            ],
            "Social sciences, other": [
                "Applied linguistics",
                "Archeology",
                "Criminal justice and corrections",
                "Criminology",
                "Geography and cartography",
                "International relations and national security studies",
                "Linguistics",
                "Social sciences nec"
            ]
        }
    },
    {
        name: "Business",
        subCategories: {
            "Business administration and management": [
                "Business management and administration",
                "Organizational leadership",
                "Business administration and management nec"
            ],
            "Business, other": [
                "Accounting and accounting-related",
                "Finance and financial management",
                "Management information systems",
                "Management sciences",
                "Marketing",
                "Organizational behavior studies",
                "Business nec"
            ]
        }
    },
    {
        name: "Education",
        subCategories: {
            "Education leadership and administration": [
                "Educational leadership and administration, general",
                "Higher education and community college administration",
                "Education leadership and administration nec"
            ],
            "Education research": [
                "Curriculum and instruction",
                "Educational assessment, evaluation, and research methods",
                "Educational/ instructional technology and media design",
                "Higher education evaluation and research",
                "Student counseling and personnel services",
                "Education research nec"
            ],
            "Teacher education": [
                "Adult, continuing, and workforce education and development",
                "Bilingual, multilingual, and multicultural education",
                "Mathematics teacher education",
                "Music teacher education",
                "Special education and teaching",
                "STEM educational methods",
                "Teacher education, science and engineering",
                "Teacher education, specific levels and methods",
                "Teacher education, specific subject areas"
            ],
            "Education, other": [
                "Education, general",
                "Education nec"
            ]
        }
    },
    {
        name: "Humanities",
        subCategories: {
            "English language and literature, letters": [
                "American literature (United States)",
                "Creative writing",
                "English language and literature, general",
                "English literature (British and commonwealth)",
                "Rhetoric and composition, and writing studies",
                "English language and literature nec"
            ],
            "Foreign languages, literatures, and linguistics": [
                "Comparative literature",
                "Hispanic/ Latin American languages, literatures, and linguistics",
                "Romance languages, literatures, and linguistics",
                "Spanish language and literature",
                "Foreign languages, literatures, and linguistics nec"
            ],
            "History": [
                "American history (United States)",
                "European history",
                "History, general",
                "History, regional focus",
                "History nec"
            ],
            "Philosophy and religious studies": [
                "Philosophy",
                "Religion/ religious studies",
                "Philosophy and religious studies nec"
            ],
            "Humanities, other": [
                "Bible/ biblical studies",
                "Humanities and humanistic studies",
                "Theological and ministerial studies"
            ]
        }
    },
    {
        name: "Visual and performing arts",
        subCategories: {
            "Performing arts": [
                "Dance, drama, theatre arts and stagecraft",
                "Music performance",
                "Music theory and composition",
                "Musicology and ethnomusicology",
                "Music nec"
            ],
            "Visual arts, media studies, and design": [
                "Art history, criticism and conservation",
                "Film, cinema, and media studies",
                "Visual arts, media studies/ design, and arts management nec"
            ]
        }
    },
    {
        name: "Other non-science and engineering",
        subCategories: {
            "Communications and journalism": [
                "Applied communication, advertising, and public relations",
                "Communication and media studies",
                "Communication, general",
                "Mass communication/ media studies",
                "Communications and journalism nec"
            ],
            "Multidisciplinary/ interdisciplinary studies": [
                "Classical and ancient studies",
                "Multidisciplinary/ interdisciplinary studies nec"
            ],
            "Public administration and social services": [
                "Public administration",
                "Social work and human services"
            ],
            "Non-science and engineering, other": [
                "Architecture and architectural studies",
                "City/ urban, community, and regional planning",
                "Family, consumer sciences and human sciences",
                "Homeland security and protective services",
                "Law, legal studies and research",
                "Parks, recreation, leisure, fitness, and sport studies and management",
                "Other non-science and engineering nec"
            ]
        }
    }
];

function convertString(str: string) {
    return encodeURIComponent(str);
}

const data: DataStructure = {
    versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
    navMain: taxonomy.map((category) => ({
      title: category.name,
      url: convertString(category.name),
      items: Object.entries(category.subCategories).map(
        ([subCategoryTitle, subCategoryItems]) => ({
          title: subCategoryTitle,
          url: convertString(subCategoryTitle),
          items: subCategoryItems.map((item: string) => ({
            title: item,
            url: convertString(item),
          })),
        })
      ),
    })),
  };


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="p-4">
        <SearchForm />
      </SidebarHeader>
      <SidebarContent className="gap-0 p-4">
        {/* We create a collapsible SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen={false}
            className="group/collapsible text-suGold"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <CollapsibleTrigger>
                <Link href={"/categories/"+item.url}>
                  {item.title}
                </Link>
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent className="overflow-scroll max-h-2rem">
                <SidebarGroupContent >
                  <SidebarMenu>
                    {item.items?.map((obj) => (
                        <Collapsible
                        key={obj.title}
                        title={obj.title}
                        defaultOpen={false}
                        className="group/collapsible text-suGold"
                      >
                        <SidebarGroup>
                          <SidebarGroupLabel
                            asChild
                            className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                          >
                            <CollapsibleTrigger>
                            <Link href={"/categories/"+item.url+"/"+obj.url}>
                              {obj.title}
                            </Link>
                              <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                            </CollapsibleTrigger>
                          </SidebarGroupLabel>
                          <CollapsibleContent className="overflow-scroll">
                            <SidebarGroupContent>
                              <SidebarMenu>
                                {obj.items?.map((inner) => (
                                  <SidebarMenuItem key={inner.title}>
                                    <SidebarMenuButton asChild>
                                      <Link href={"/categories/"+item.url+"/"+obj.url+"/"+inner.url}>{inner.title}</Link>
                                    </SidebarMenuButton>
                                  </SidebarMenuItem>
                                ))}
                              </SidebarMenu>
                            </SidebarGroupContent>
                          </CollapsibleContent>
                        </SidebarGroup>
                      </Collapsible>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
